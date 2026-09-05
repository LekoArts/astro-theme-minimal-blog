import type { AsideType } from './constants'
import { defineHastPlugin, defineMdastPlugin } from 'satteri'
import { ASIDE_TYPES } from './constants'

export const satteriAsides = defineMdastPlugin({
	name: 'asides',
	containerDirective(node, ctx) {
		if (!ASIDE_TYPES.includes(node.name as AsideType))
			return

		const children = [...node.children]
		const firstChild = children[0]
		let title = ''

		if (firstChild?.type === 'paragraph' && firstChild.data?.directiveLabel) {
			title = ctx.textContent(firstChild).trim()
			children.shift()
		}

		ctx.replaceNode(node, {
			type: 'mdxJsxFlowElement',
			name: 'Aside',
			attributes: [
				{
					type: 'mdxJsxAttribute',
					name: 'type',
					value: node.name,
				},
				{
					type: 'mdxJsxAttribute',
					name: 'title',
					value: title,
				},
			],
			children,
		})
	},
})

export const satteriExternalLinks = defineHastPlugin({
	name: 'external-links',
	element: {
		filter: ['a'],
		visit(node, ctx) {
			const href = node.properties?.href

			if (typeof href !== 'string' || (!href.startsWith('http://') && !href.startsWith('https://')))
				return

			ctx.setProperty(node, 'target', '_blank')
			ctx.setProperty(node, 'rel', ['nofollow'])
			ctx.setProperty(node, 'className', ['external_link'])
			ctx.appendChild(node, {
				type: 'element',
				tagName: 'span',
				properties: { className: ['sr-only'] },
				children: [{ type: 'text', value: ' (opens in a new window)' }],
			})
		},
	},
})

export const satteriHeadingPermalinks = defineHastPlugin({
	name: 'heading-permalinks',
	element: {
		filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		visit(node, ctx) {
			const id = node.properties?.id

			if (typeof id !== 'string')
				return

			ctx.setProperty(node, 'tabIndex', -1)
			ctx.wrapNode(node, {
				type: 'element',
				tagName: 'div',
				properties: { className: ['markdown-heading'] },
				children: [
					{
						type: 'element',
						tagName: 'a',
						properties: {
							href: `#${id}`,
							ariaLabel: `Permalink: ${ctx.textContent(node)}`,
							className: ['anchor'],
						},
						children: [
							{
								type: 'element',
								tagName: 'svg',
								properties: { className: ['anchor-icon'], viewBox: '0 0 16 16', ariaHidden: 'true' },
								children: [
									{
										type: 'element',
										tagName: 'path',
										properties: { d: 'm7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z' },
										children: [],
									},
								],
							},
						],
					},
				],
			})
		},
	},
})
