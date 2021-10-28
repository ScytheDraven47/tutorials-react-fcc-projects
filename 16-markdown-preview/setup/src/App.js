import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const MARKDOWN = `
# Markdown Preview
---
An intro to markdown

### Inline options
---
An example of **bold** text, *italicized* text, or ***how about both*** text, and some decidedly less obvious \`inline_code\`

Also, here's a 
[link](https://localhost) for more information.
![if you can see this, you've lost internet :P](https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg)

### Block options
---
> blockquote
\`\`\`
block code
\`\`\`

### List Options
---
1. This
2. Is
5. An
7. Ordered
99. List

- an
- unordered
- list
- This
- is

`

function App() {
	const [markdown, setMarkdown] = useState(MARKDOWN)

	return (
		<main>
			<section className='markdown'>
				<textarea
					className='input'
					value={markdown}
					onChange={(e) => setMarkdown(e.target.value)}
				></textarea>
				<article className='result'>
					<ReactMarkdown>{markdown}</ReactMarkdown>
				</article>
			</section>
		</main>
	)
}

export default App
