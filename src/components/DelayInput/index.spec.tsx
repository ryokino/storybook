import {
  render,
  RenderResult,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { DelayInput } from './index';

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
  let renderResult: RenderResult;
  let handleChange: jest.Mock;

  beforeEach(() => {
    // モック関数を作成する
    handleChange = jest.fn();

    //   モック関数をDelayButtonに渡して描画
    renderResult = render(<DelayInput onChange={handleChange} />);

    //   タイマーを jest のものに置き換える
    jest.useFakeTimers();
  });

  afterEach(() => {
    renderResult.unmount();

    //   タイマーを元のものに戻す
    jest.useFakeTimers();
  });

  // span要素のテキストが空であることをテスト
  it('Should display empty in span on initial render', () => {
    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // 初期表示は空
    expect(spanNode).toHaveTextContent('入力したテキスト:');
  });

  // 入力直後は span 要素が「入力中...」と表示するかテスト
  it('Should display 「入力中...」immediately after onChange event occurs', () => {
    const inputText = 'Test Input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;

    // input の onChange イベントを呼び出す
    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // 入力中と表示するか確認
    expect(spanNode).toHaveTextContent('入力中...');
  });

  // 入力して1秒後にテキストが表示されるかテスト
  it('Should display input text 1sec after onChange event occurs', async () => {
    const inputText = 'Test Input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;

    //   input の onChange イベントを呼び出す

    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    //   act 関数ないで実行することでタイマーのコールバック中で起きる状態変更が反映されることを保証する
    act(() => {
      //   タイマーにセットされた timeout を全て実行する
      jest.runAllTimers();
    });

    const spanNode = screen.getByTestId('display-text') as HTMLSpanElement;

    // 入力したテキストが表示されるか確認
    expect(spanNode).toHaveTextContent(`入力したテキスト: ${inputText}`);
  });

  //   入力して1秒後に onChange が呼ばれるかテスト
  it('Should call onChange 1sec after onChange event occurs', async () => {
    const inputText = 'Test Input Text';
    const inputNode = screen.getByTestId('input-text') as HTMLInputElement;

    //   input の onChange イベントを呼び出す
    fireEvent.change(inputNode, {
      target: {
        value: inputText,
      },
    });

    //   act 関数ないで実行することでタイマーのコールバック中で起きる状態変更が反映されることを保証する
    act(() => {
      //   タイマーにセットされた timeout を全て実行する
      jest.runAllTimers();
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
