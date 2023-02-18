import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StyledButton } from '../components/StyledButton';
// import MDXDocument from 'StyledButton.mdx';
import { linkTo } from '@storybook/addon-links';

// ファイル内のStoryの設定（メタデータオブジェクト)
export default {
  title: 'StyledButton',
  component: StyledButton,
  // argTypes: {
  //   variant: {
  //     control: {
  //       type: 'radio',
  //     },
  //     options: ['primary', 'success', 'transparent'],
  //   },
  //   children: {
  //     control: { type: 'text' },
  //   },
  // },
  // parameters: {
  //   // docs: {
  //   //   // ドキュメント用の mdx コンポーネントを指定
  //   //   page: MDXDocument,
  //   // },
  // },
} as ComponentMeta<typeof StyledButton>;

// テンプレートコンポーネントを実装
// Storybook から渡された props をそのまま Button に渡す
// const Template: ComponentStory<typeof StyledButton> = (args) => (
//   <StyledButton {...args} />
// );

// bind を呼び出し Story を作成
// export const TemplateTest = Template.bind({});

// デフォルトの props を設定する
// TemplateTest.args = {
//   variant: 'primary',
//   children: 'Primary',
// };

export const Primary = (props) => {
  // クリックしたら StyledButton/Success のストーリーへ遷移する。
  return (
    <StyledButton
      {...props}
      varient='primary'
      onClick={linkTo('StyledButton', 'Success')}
    >
      Primary
    </StyledButton>
  );
};
export const Success = (props) => {
  // クリックしたら StyledButton/Transparent のストーリーへ遷移する。
  return (
    <StyledButton
      {...props}
      varient='success'
      onClick={linkTo('StyledButton', 'Transparent')}
    >
      Success
    </StyledButton>
  );
};
export const Transparent = (props) => {
  // クリックしたら StyledButton/Primary のストーリーへ遷移する。
  return (
    <StyledButton
      {...props}
      varient='transparent'
      onClick={linkTo('StyledButton', 'Primary')}
    >
      Transparent
    </StyledButton>
  );
};
