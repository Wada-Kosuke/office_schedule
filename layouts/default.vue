<template>
  <div class="container-fluid">
    <nuxt />
  </div>
</template>

<style lang="scss">
/* universal */
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
a, a:hover {
  text-decoration: none;
  color: inherit;
}
ul { list-style: none; }
p { margin: 0; }

// transition
.page-enter-active, .page-leave-active {
  transition: opacity 0.2s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter, .modal-leave-active {
  opacity: 0;
}

/* button */
button { font-size: 10px; }
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  background: #fff;
  text-decoration: none;
  padding: 10px 30px;
  &:hover {
    color: #fff;
    background-color: #3b8070;
    cursor: pointer;
  }
}

/* title */
.title {
  margin-bottom: 20px;
  padding-bottom: 2px;
  display: inline-block;
  border-bottom: 2px solid #3b8070;
}
.describe {
  margin: -12px 0 12px 1vw;
  color: #555;
  font-size: 14px;
  & + ul li span {
    cursor: pointer;
  }
}

/* list */
.list {
  margin: 16px auto;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  ul {
    padding: 0;
    margin: 6px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    li {
      padding: 8px 28px;
      font-size: 18px;
      border-radius: 5px;
      &:nth-child(odd) { background: #F0FFF0; }
      &:nth-child(even) { background: #F8FFF8; }
    }
  }
  button {
    margin-left: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  h6 { margin-left: 2vw; }
}

/* form */
.form {
  margin: 24px auto;
  padding: 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  h4 { margin-bottom: 20px; }
  input {
    margin-bottom: 10px;
    width: 80%;
    padding: 4px;
  }
  button {
    width: 120px;
    margin: 12px 0 0 20px;
    font-size: 16px;
    padding: 6px;
  }
}
.form-label:before {
  content: "\02713  ";
  font-size: 12px;
  color: #3b8070;
  font-weight: bold;
}

// カレンダータップ時に文字が選択されてしまうのでとりあえずこれで対処
@media screen and (max-width: 993px) {
  .container-fluid { user-select: none; }
}
</style>
