import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * GET - Get all Canvas grades
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: grades, error } = await supabase
      .from('canvas_grades')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      throw error
    }

    // Fetch user courses for course details mapping
    const { data: userCourses } = await supabase
      .from('canvas_courses')
      .select('canvas_course_id, name, course_code')
      .eq('user_id', user.id)

    const courseMap = new Map(userCourses?.map(c => [c.canvas_course_id, c]) || [])

    const gradesWithCourses = (grades || []).map(g => ({
      ...g,
      canvas_courses: courseMap.get(g.canvas_course_id) || { name: 'Canvas Course', course_code: 'CANVAS' }
    }))

    return NextResponse.json({
      grades: gradesWithCourses,
      count: gradesWithCourses.length,
    })
  } catch (error: any) {
    console.error('Error fetching Canvas grades:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch grades' 
    }, { status: 500 })
  }
}

