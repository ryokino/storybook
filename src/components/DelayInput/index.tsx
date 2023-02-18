import React, { useState, useRef, useCallback } from 'react';

type DelayButtonProps = {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const DelayInput = (props: DelayButtonProps) => {
  const { onChange } = props;

  //   入力中かどうかを保持する状態
  const [isTypeing, setIsTypeing] = useState(false);

  // inputに表示するテキストを保持する状態
  const [inputValue, setInputValue] = useState('');

  //   spanに表示するテキストを保持する状態
  const [viewValue, setViewValue] = useState('');

  //   タイマーを保持する状態
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      //   入力中のフラグをセットする
      setIsTypeing(true);

      //   inputに表示するテキストを更新する
      setInputValue(e.target.value);

      //   もしtimerRefに以前設定したタイマーがある場合は先に解除する
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      //   1秒後に実行するタイマーをセットする
      timerRef.current = setTimeout(() => {
        //   入力中のフラグを解除する
        setIsTypeing(false);

        //   spanに表示するテキストを更新する
        setViewValue(e.target.value);

        //   onChangeコールバックを呼ぶ
        onChange(e);
      }, 1000);
    },
    [onChange]
  );

  // spanに表示するテキスト
  const text = isTypeing ? '入力中...' : `入力したテキスト: ${viewValue}`;

  return (
    <div>
      {/* data-testidはテスト中だけ使用するID */}
      <input
        data-testid='input-text'
        value={inputValue}
        onChange={handleChange}
      />
      <span data-testid='display-text'> {text}</span>
    </div>
  );
};
