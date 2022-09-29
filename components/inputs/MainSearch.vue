<template>
  <div class="main-search">
    <label for="mainProductSearch">Search Items</label>
    <input
      id="mainProductSearch"
      name="searchQuery"
      type="text"
      placeholder="Apple Watch, Samsung S21, Macbook Pro, ..."
    />
  </div>
</template>
<style scoped>
.main-search {
  width: fit-content;
  height: fit-content;
  padding: 10px 20px;
}

.main-search > * {
  display: block;
}

.main-search label {
  color: #60695c;
}

.main-search input {
  height: 45px;
  width: 30vw;
  background: #fff;
  box-shadow: 0 4 16 rgba(26 31 22 / 15%);
  border-radius: 13px;
  margin-top: 0.5rem;
  outline: none;
  border:none;
  padding-left: 15px;
  transition: 0.1s ease-in-out;
  font-size: 20px;
}

.main-search input:focus {
  border: 0.125em solid #02d693;
}

.main-search input::placeholder {
  color: #1a1f166c;
  font-size: 20px;
}

@media (max-width: 1086px) {
  .main-search input {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .main-search input {
    width: 100%;
  }
}
</style>
