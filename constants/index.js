export const STORAGE = {
  latestPosts: 'wp_posts_recent',
  latestPostsSearched: 'wp_search_list_of_post',
  postsRead: 'wp_posts_read',
  errorsReported: 'app_error_reports'
}

export const STANDARD_RESPONSE = {
  message: '',
  date: new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(new Date())
}

export const API_RESPONSE = {
  ...STANDARD_RESPONSE,
  data: []
}

export const ERROR_RESPONSE = {
  ...STANDARD_RESPONSE,
  callback: {}
}

export const API_FAIL_RESPONSE = {
  ...STANDARD_RESPONSE,
  status: 'fail',
  type: '',
  origin: ''
}

export const API_OK_RESPONSE = {
  ...STANDARD_RESPONSE,
  status: 'ok'
}
