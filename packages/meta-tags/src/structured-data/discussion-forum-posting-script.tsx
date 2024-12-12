import Script from 'next/script'

import { createScript } from '../utils'
import { DiscussionForumPostingScriptProps } from '../types'

export function DiscussionForumPostingScript(
  props: DiscussionForumPostingScriptProps,
) {
  const discussionForumPosting = createScript(props, 'DiscussionForumPosting')

  return (
    <Script
      id="discussion-forum-posting-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(discussionForumPosting, null, '\t'),
      }}
    />
  )
}
