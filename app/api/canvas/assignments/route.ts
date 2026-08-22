import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * GET - Get all Canvas assignments with optional filters
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
    const status = searchParams.get('status') // upcoming, past, all
    const submitted = searchParams.get('submitted') // true, false, all

    let query = supabase
      .from('canvas_assignments')
      .select('*')
      .eq('user_id', user.id)
      .order('due_at', { ascending: true, nullsFirst: false })

    // Filter by course
    if (courseId && courseId !== 'all') {
      query = query.eq('canvas_course_id', courseId)
    }

    // Filter by submission status
    if (submitted === 'true') {
      query = query.eq('has_submitted', true)
    } else if (submitted === 'false') {
      query = query.eq('has_submitted', false)
    }

    const { data: assignments, error } = await query

    if (error) {
      throw error
    }

    // Fetch user courses for course details mapping
    const { data: userCourses } = await supabase
      .from('canvas_courses')
      .select('canvas_course_id, name, course_code')
      .eq('user_id', user.id)

    const courseMap = new Map(userCourses?.map(c => [c.canvas_course_id, c]) || [])

    let filteredAssignments = (assignments || []).map(a => ({
      ...a,
      canvas_courses: courseMap.get(a.canvas_course_id) || { name: 'Canvas Course', course_code: 'CANVAS' }
    }))

    const now = new Date()

    if (status === 'upcoming') {
      filteredAssignments = filteredAssignments.filter(a => 
        a.due_at && new Date(a.due_at) > now
      )
    } else if (status === 'past') {
      filteredAssignments = filteredAssignments.filter(a => 
        a.due_at && new Date(a.due_at) <= now
      )
    }

    return NextResponse.json({
      assignments: filteredAssignments,
      count: filteredAssignments.length,
    })
  } catch (error: any) {
    console.error('Error fetching Canvas assignments:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch assignments' 
    }, { status: 500 })
  }
}

