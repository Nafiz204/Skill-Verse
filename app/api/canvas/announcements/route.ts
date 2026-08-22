import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * GET - Get all Canvas announcements with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const isRead = searchParams.get('isRead')
    const limit = searchParams.get('limit')

    let query = supabase
      .from('canvas_announcements')
      .select('*')
      .eq('user_id', user.id)
      .order('posted_at', { ascending: false })

    // Filter by course
    if (courseId && courseId !== 'all') {
      query = query.eq('canvas_course_id', courseId)
    }

    // Filter by read status
    if (isRead === 'true') {
      query = query.eq('is_read', true)
    } else if (isRead === 'false') {
      query = query.eq('is_read', false)
    }

    // Limit results
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data: announcements, error } = await query

    if (error) {
      throw error
    }

    // Fetch user courses for course details mapping
    const { data: userCourses } = await supabase
      .from('canvas_courses')
      .select('canvas_course_id, name, course_code')
      .eq('user_id', user.id)

    const courseMap = new Map(userCourses?.map(c => [c.canvas_course_id, c]) || [])

    const announcementsWithCourses = (announcements || []).map(a => ({
      ...a,
      canvas_courses: courseMap.get(a.canvas_course_id) || { name: 'Canvas Course', course_code: 'CANVAS' }
    }))

    return NextResponse.json({
      announcements: announcementsWithCourses,
      count: announcementsWithCourses.length,
    })
  } catch (error: any) {
    console.error('Error fetching Canvas announcements:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch announcements' 
    }, { status: 500 })
  }
}

/**
 * PATCH - Mark announcement as read/unread
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { announcementId, isRead } = body

    if (!announcementId) {
      return NextResponse.json({ 
        error: 'Announcement ID is required' 
      }, { status: 400 })
    }

    const { error } = await supabase
      .from('canvas_announcements')
      .update({ 
        is_read: isRead,
        updated_at: new Date().toISOString(),
      })
      .eq('id', announcementId)
      .eq('user_id', user.id)

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: `Announcement marked as ${isRead ? 'read' : 'unread'}`,
    })
  } catch (error: any) {
    console.error('Error updating announcement:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to update announcement' 
    }, { status: 500 })
  }
}

