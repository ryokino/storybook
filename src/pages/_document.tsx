import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// デフォルトの Document を MyDocument で上書きする
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // 初期値を流用
      const initialProps = await Document.getInitialProps(ctx);

      // initialProps に加えて、 style を追加して返す。
      return {
        ...initialProps,
        styles: [
          // もともとの style
          initialProps.styles,
          // styled-components の style
          sheet.getStyleElement(),
        ],
      };
    } finally {
      sheet.seal();
    }
  }
}
