import NextDocument, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class Document extends NextDocument {
	// static async getInitialProps(ctx: any): Promise<any> {
	// 	const sheet = new ServerStyleSheet();
	// 	const originalRenderPage = ctx.renderPage;

	// 	try {
	// 		ctx.renderPage = () =>
	// 			originalRenderPage({
	// 				enhanceApp: (App: any) => (props: any) =>
	// 					sheet.collectStyles(<App {...props} />),
	// 			});

	// 		const initialProps = await Document.getInitialProps(ctx);
	// 		return {
	// 			...initialProps,
	// 			styles: (
	// 				<>
	// 					{initialProps.styles}
	// 					{sheet.getStyleElement()}
	// 				</>
	// 			),
	// 		};
	// 	} finally {
	// 		sheet.seal();
	// 	}
	// }
	render() {
		return (
			<html>
				<Head>
					<base href='/' />
					<meta charSet='UTF-8' />
					<meta httpEquiv='X-UA-Compatible' content='IE=Edge' />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link rel='stylesheet' href={`/css/style.css`} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}