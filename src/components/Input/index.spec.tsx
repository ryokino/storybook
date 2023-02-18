import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { Input } from './index';

// describeで処理をまとめる
describe('Input', () => {
  let renderResult: RenderResult;

  //   それぞれのテストケース前にコンポーネントを描画し、renderResult にセットする
  beforeEach(() => {
    renderResult = render(<Input id='username' label='Username' />);
  });

  //   テストケース実行後に描画していたコンポーネントを解放する
  afterEach(() => {
    renderResult.unmount();
  });

  // 初期描画時に input 要素が空であることをテスト
  it('Should empty in input on initial render', () => {
    // label が Username であるコンポーネントに対応する input の要素を取得する
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement;

    // input 要素の表示が空か確認する
    expect(inputNode).toHaveValue('');
  });
  it('Should show input text', () => {
    const inputText = 'Text Input Text';
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement;

    // fireEventを使って、input要素の onChange イベントを発火する
    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    //   input 要素に入力したテキストが表示されているか確認
    expect(inputNode).toHaveValue(inputText);
  });
  //   ボタンが押されたら、入力テキストがクリアするかチェック
  it('Should rest when user clicks button', async () => {
    //   最初にinputにテキストを入力する
    const inputText = 'Test Input Text';
    const inputNode = screen.getByLabelText('Username') as HTMLInputElement;
    await waitFor(() => {
      fireEvent.change(inputNode, {
        target: {
          value: inputText,
        },
      });

      //   ボタンを取得する
      const buttonNode = screen.getByRole('button', {
        name: 'Reset',
      }) as HTMLInputElement;
      // ボタンをクリックする
      fireEvent.click(buttonNode);

      // input要素の表示が空か確認する
      expect(inputNode).toHaveValue('');
    });
  });
});
