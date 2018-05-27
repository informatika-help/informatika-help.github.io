"use strict";

var vue = new Vue({
  el: "#app",
  data: function data() {
    return {
      SheetID: "1KAE72-IKYMXKEW8LsniRdAE5nUf05SEfoOCK2ogzcz8",
      isLoaded: false,
      main_sheet: null,
      current_sheet: null
    };
  },
  mounted: function mounted() {
    this.getSheet("main", true);
  },
  // Зачем же тут запрос главной таблицы если она не юзается?!
  // А нехуй тут быстро работать, я же зачем-что писал лишний кусок кода, пустьработает.
  methods: {
    getSheet: function getSheet(sheet) {
      var _this = this;

      var isMain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var url = "https://script.google.com/macros/s/AKfycbygukdW3tt8sCPcFDlkMnMuNu9bH5fpt7bKV50p2bM/exec?id=" + this.SheetID + "&sheet=" + sheet;
      axios({ method: "GET", "url": url }).then(function (result) {
        if (isMain) {
          _this.main_sheet = result.data[sheet];
        } else {
          _this.current_sheet = result.data[sheet];_this.isLoaded = true;
        }
      }, function (error) {
        console.error(error);
      });
    },
    loadLessons: function loadLessons() {
      var form = document.getElementById("src-select-form").value;
      var group = document.getElementById("src-select-group").value;

      console.log("f: " + form + " || g: " + group);
      if (form>0 && group>0) {
        var sheet = "f" + form + "g" + group;
        this.getSheet(sheet);
      }
    }
  }
});
