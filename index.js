// let data = new URLSearchParams(
//   "PageInfo%5BIgnorePagesize%5D=false&PageInfo%5BPage%5D=1&PageInfo%5BPageSize%5D=20&SortInfo%5B0%5D%5BFieldName%5D=DeadlineDate&SortInfo%5B0%5D%5BSortDirection%5D=asc&FilterInfo%5B0%5D%5BFieldName%5D=DeadlineDate&FilterInfo%5B0%5D%5BCollectionMemberFieldname%5D=&FilterInfo%5B0%5D%5BValueType%5D=0&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BOperator%5D=Between&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BValue%5D=0%2C30&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BValueSemantics%5D=1&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BSiblingJoin%5D=and&FilterInfo%5B0%5D%5BIsPreprocessorFilter%5D=false&FilterInfo%5B1%5D%5BFieldName%5D=BallotID&FilterInfo%5B1%5D%5BCollectionMemberFieldname%5D=&FilterInfo%5B1%5D%5BValueType%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BOperator%5D=IsGreaterThan&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BValue%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BValueSemantics%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BSiblingJoin%5D=and&FilterInfo%5B1%5D%5BIsPreprocessorFilter%5D=false&SelectedFields%5BFields%5D%5B0%5D%5BID%5D=1&SelectedFields%5BFields%5D%5B1%5D%5BID%5D=2&SelectedFields%5BFields%5D%5B2%5D%5BID%5D=15&SelectedFields%5BFields%5D%5B3%5D%5BID%5D=39&SelectedFields%5BFields%5D%5B4%5D%5BID%5D=17&SelectedFields%5BFields%5D%5B5%5D%5BID%5D=10&SelectedFields%5BFields%5D%5B6%5D%5BID%5D=8&SelectedFields%5BFields%5D%5B7%5D%5BID%5D=3&SelectedFields%5BFields%5D%5B8%5D%5BID%5D=7&SelectedFields%5BFields%5D%5B9%5D%5BID%5D=4&SelectedFields%5BFields%5D%5B10%5D%5BID%5D=5&SelectedFields%5BFields%5D%5B11%5D%5BID%5D=6&SelectedFields%5BFields%5D%5B12%5D%5BID%5D=11"
// );

// const obj = Object.fromEntries(data);
// const stringifyObj = JSON.stringify(obj);

// console.log(obj);

const fs = require("fs");

const inputData =
  "PageInfo%5BIgnorePagesize%5D=false&PageInfo%5BPage%5D=1&PageInfo%5BPageSize%5D=20&SortInfo%5B0%5D%5BFieldName%5D=DeadlineDate&SortInfo%5B0%5D%5BSortDirection%5D=asc&FilterInfo%5B0%5D%5BFieldName%5D=DeadlineDate&FilterInfo%5B0%5D%5BCollectionMemberFieldname%5D=&FilterInfo%5B0%5D%5BValueType%5D=0&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BOperator%5D=Between&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BValue%5D=0%2C30&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BValueSemantics%5D=1&FilterInfo%5B0%5D%5BExpressions%5D%5B0%5D%5BSiblingJoin%5D=and&FilterInfo%5B0%5D%5BIsPreprocessorFilter%5D=false&FilterInfo%5B1%5D%5BFieldName%5D=BallotID&FilterInfo%5B1%5D%5BCollectionMemberFieldname%5D=&FilterInfo%5B1%5D%5BValueType%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BOperator%5D=IsGreaterThan&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BValue%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BValueSemantics%5D=0&FilterInfo%5B1%5D%5BExpressions%5D%5B0%5D%5BSiblingJoin%5D=and&FilterInfo%5B1%5D%5BIsPreprocessorFilter%5D=false&SelectedFields%5BFields%5D%5B0%5D%5BID%5D=1&SelectedFields%5BFields%5D%5B1%5D%5BID%5D=2&SelectedFields%5BFields%5D%5B2%5D%5BID%5D=15&SelectedFields%5BFields%5D%5B3%5D%5BID%5D=39&SelectedFields%5BFields%5D%5B4%5D%5BID%5D=17&SelectedFields%5BFields%5D%5B5%5D%5BID%5D=10&SelectedFields%5BFields%5D%5B6%5D%5BID%5D=8&SelectedFields%5BFields%5D%5B7%5D%5BID%5D=3&SelectedFields%5BFields%5D%5B8%5D%5BID%5D=7&SelectedFields%5BFields%5D%5B9%5D%5BID%5D=4&SelectedFields%5BFields%5D%5B10%5D%5BID%5D=5&SelectedFields%5BFields%5D%5B11%5D%5BID%5D=6&SelectedFields%5BFields%5D%5B12%5D%5BID%5D=11";

let data = new URLSearchParams(inputData);

function unflatten(data) {
  let result = {};
  for (let i in data) {
    const x = i.replaceAll("]", "");
    let keys = x.split("[");
    keys.reduce(function (r, e, j) {
      return (
        r[e] ||
        (r[e] = isNaN(Number(keys[j + 1]))
          ? keys.length - 1 == j
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
}

const obj = Object.fromEntries(data);

fs.writeFileSync("output.json", JSON.stringify(unflatten(obj)));
