# Design Document

## Overview

TODOアプリは、Angular 17+とTypeScriptを使用したシングルページアプリケーション（SPA）として実装します。コンポーネントベースのアーキテクチャを採用し、再利用可能で保守しやすい構造を目指します。初期バージョンではローカル状態管理を使用し、将来的にはバックエンドAPIとの連携やより高度な状態管理への拡張を可能にする設計とします。

## Architecture

### アプリケーション構造
```
src/
├── app/
│   ├── components/
│   │   ├── todo-list/
│   │   ├── todo-item/
│   │   └── todo-form/
│   ├── models/
│   │   └── todo.model.ts
│   ├── services/
│   │   └── todo.service.ts
│   └── app.component.ts
├── assets/
└── styles/
```

### アーキテクチャパターン
- **コンポーネント分離**: 機能ごとに独立したコンポーネント
- **サービス層**: ビジネスロジックとデータ管理の分離
- **リアクティブプログラミング**: RxJSを使用した状態管理
- **型安全性**: TypeScriptの厳密な型チェック

## Components and Interfaces

### 1. AppComponent (ルートコンポーネント)
- **責務**: アプリケーション全体のレイアウトとナビゲーション
- **テンプレート**: ヘッダー、メインコンテンツエリア
- **依存関係**: TodoService

### 2. TodoFormComponent
- **責務**: 新しいタスクの入力と追加
- **プロパティ**:
  - `taskInput: string` - 入力フィールドの値
- **イベント**:
  - `taskAdded: EventEmitter<string>` - タスク追加イベント
- **メソッド**:
  - `onSubmit()` - フォーム送信処理
  - `clearInput()` - 入力フィールドのクリア

### 3. TodoListComponent
- **責務**: タスクリストの表示と統計情報
- **プロパティ**:
  - `todos: Todo[]` - タスクリスト
  - `totalCount: number` - 総タスク数
  - `completedCount: number` - 完了タスク数
- **メソッド**:
  - `ngOnInit()` - 初期化処理
  - `updateStatistics()` - 統計情報の更新

### 4. TodoItemComponent
- **責務**: 個別タスクの表示と操作
- **入力プロパティ**:
  - `todo: Todo` - タスクオブジェクト
- **イベント**:
  - `todoToggled: EventEmitter<number>` - 完了状態切り替え
  - `todoDeleted: EventEmitter<number>` - タスク削除
- **メソッド**:
  - `onToggleComplete()` - 完了状態の切り替え
  - `onDelete()` - タスクの削除

## Data Models

### Todo Interface
```typescript
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

### TodoService State
```typescript
interface TodoState {
  todos: Todo[];
  nextId: number;
}
```

## Error Handling

### バリデーション
- **空タスクチェック**: 入力値の空文字・空白文字チェック
- **文字数制限**: 最大文字数の制限（例：200文字）
- **重複チェック**: 同一テキストのタスク重複防止（オプション）

### エラー表示
- **フォームエラー**: 入力フィールド下部にエラーメッセージ表示
- **操作エラー**: トースト通知またはアラートでの表示
- **エラー状態**: 適切なCSSクラスでの視覚的フィードバック

### エラーハンドリング戦略
```typescript
// サービス層でのエラーハンドリング
try {
  // 操作実行
} catch (error) {
  console.error('Todo operation failed:', error);
  // ユーザーへの通知
}
```

## Testing Strategy

### 単体テスト (Jasmine + Karma)
- **コンポーネントテスト**: 各コンポーネントの動作確認
- **サービステスト**: TodoServiceのメソッド動作確認
- **モデルテスト**: データモデルの型安全性確認

### テストカバレッジ目標
- **コンポーネント**: 90%以上
- **サービス**: 95%以上
- **重要なビジネスロジック**: 100%

### E2Eテスト (Cypress/Protractor)
- **ユーザーフロー**: タスクの追加→完了→削除の一連の流れ
- **エラーケース**: 無効な入力に対する適切な処理
- **レスポンシブ**: 異なる画面サイズでの動作確認

### テスト実装方針
```typescript
describe('TodoService', () => {
  it('should add new todo', () => {
    // Given: 初期状態
    // When: タスク追加
    // Then: 期待される結果
  });
});
```

## UI/UX Design

### レスポンシブデザイン
- **モバイルファースト**: 320px以上の画面サイズ対応
- **ブレークポイント**: 768px（タブレット）、1024px（デスクトップ）
- **フレキシブルレイアウト**: CSS Grid/Flexboxの活用

### アクセシビリティ
- **キーボードナビゲーション**: Tab/Enterキーでの操作
- **スクリーンリーダー対応**: 適切なARIAラベル
- **カラーコントラスト**: WCAG 2.1 AA準拠

### ユーザビリティ
- **即座のフィードバック**: 操作結果の即時反映
- **直感的なUI**: 一般的なTODOアプリのパターンに準拠
- **パフォーマンス**: 軽量で高速な動作

## Technology Stack

### フロントエンド
- **Angular**: 17+ (最新安定版)
- **TypeScript**: 5.0+
- **RxJS**: 7.0+ (リアクティブプログラミング)
- **Angular Material**: UIコンポーネント（オプション）

### 開発ツール
- **Angular CLI**: プロジェクト管理とビルド
- **ESLint**: コード品質チェック
- **Prettier**: コードフォーマット
- **Karma + Jasmine**: 単体テスト

### ビルドとデプロイ
- **Webpack**: バンドリング（Angular CLIに内包）
- **TypeScript Compiler**: トランスパイル
- **Angular DevKit**: 開発サーバーとビルド最適化