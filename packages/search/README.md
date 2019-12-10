# `search`

상단에는 검색 Navbar, 하단에는 Navbar이벤트를 통해 검색결과를 그릴수 있도록 제공해주는 컴포넌트 입니다.

## Usage

```typescript
<Search
  onDelete={() => {
    // Optional
    // Search navbar에 있는 삭제버튼을 클릭하는 이벤트
    // 옵셔널 이벤트이며, 이 이벤트 실행 뒤에 `onEmptyKeyword` 이벤트도 실행됩니다.
  }}
  onAutoComplete={async (keyword) => {
    // Optional
    // search navbar의 keyboard input에 대한 debounce (0.5s) 후에 Keyword가 있을 경우 실행되는 이벤트
  }}
  onEnter={async (keyword) => {
    // Optional
    // Search Navbar에서 엔터키를 입력했을 때 실행되는 이벤트
  }}
  onEmptyKeyword={() => {
    // Optional
    // Search Navbar에 아무런 keyword가 없을 경우 실행되는 이벤트
    // Search Navbar에서 삭제버튼을 누르거나, onAutoComplete에서 Keyword가 없는 경우에 실행되는 이벤트
  }}
  onInputChange={(keyword) => {
    // Optional
    // Search Navbar의 onChange에서 실행되는 이벤트
  }}
  placeholder={getPlaceholder(type)} // Search navbar의 placeholder // Optional
  defaultKeyword="yeffort" // Search Navbar input의 기본값. // Optional
>
  {children} // Search Navbar하단에 그려야할 검색결과 // required
</Search>
```

`triple-search-web`과 `triple-air-web`에서 쓰일 예정입니다.
