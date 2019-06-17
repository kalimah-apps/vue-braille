<template>
  <div class="braille-code">
    <slot v-if="false"></slot>
    <span class="empty" v-if="emptySlot == true"></span>
    <div
      class="braille-block"
      v-for="obj in getText"
      :data-char="obj.char"
      :data-style="design"
      :data-tip="showTip"
    >
      <span class="braille-cell" :style="{'font-size': size+'px'}" v-for="dots in obj.dots">
        <i v-for="i in 6" :class="[dots.indexOf(i) > -1 ? 'fill' : 'empty']"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { default: null },
    showTip: { default: "true" },
    design: { default: "style1" },
    size: { default: "10" }
  },
  data: function() {
    return {
      braille: {
        "0": {
          symbole: "⠚",
          dots: ["245"]
        },
        "1": {
          symbole: "⠁",
          dots: ["1"]
        },
        "2": {
          symbole: "⠃",
          dots: ["12"]
        },
        "3": {
          symbole: "⠉",
          dots: ["14"]
        },
        "4": {
          symbole: "⠙",
          dots: ["145"]
        },
        "5": {
          symbole: "⠑",
          dots: ["15"]
        },
        "6": {
          symbole: "⠋",
          dots: ["124"]
        },
        "7": {
          symbole: "⠛",
          dots: ["1245"]
        },
        "8": {
          symbole: "⠓",
          dots: ["125"]
        },
        "9": {
          symbole: "⠊",
          dots: ["24"]
        },
        a: {
          symbole: "⠁",
          dots: ["1"]
        },
        b: {
          symbole: "⠃",
          dots: ["12"]
        },
        c: {
          symbole: "⠉",
          dots: ["14"]
        },
        d: {
          symbole: "⠙",
          dots: ["145"]
        },
        e: {
          symbole: "⠑",
          dots: ["15"]
        },
        f: {
          symbole: "⠋",
          dots: ["124"]
        },
        g: {
          symbole: "⠛",
          dots: ["1245"]
        },
        h: {
          symbole: "⠓",
          dots: ["125"]
        },
        i: {
          symbole: "⠊",
          dots: ["24"]
        },
        j: {
          symbole: "⠚",
          dots: ["245"]
        },
        k: {
          symbole: "⠅",
          dots: ["13"]
        },
        l: {
          symbole: "⠇",
          dots: ["123"]
        },
        m: {
          symbole: "⠍",
          dots: ["134"]
        },
        n: {
          symbole: "⠝",
          dots: ["1345"]
        },
        o: {
          symbole: "⠕",
          dots: ["135"]
        },
        p: {
          symbole: "⠏",
          dots: ["1234"]
        },
        q: {
          symbole: "⠟",
          dots: ["12345"]
        },
        r: {
          symbole: "⠗",
          dots: ["1235"]
        },
        s: {
          symbole: "⠎",
          dots: ["234"]
        },
        t: {
          symbole: "⠞",
          dots: ["2345"]
        },
        u: {
          symbole: "⠥",
          dots: ["136"]
        },
        v: {
          symbole: "⠧",
          dots: ["1236"]
        },
        w: {
          symbole: "⠺",
          dots: ["2456"]
        },
        x: {
          symbole: "⠭",
          dots: ["1346"]
        },
        y: {
          symbole: "⠽",
          dots: ["13456"]
        },
        z: {
          symbole: "⠵",
          dots: ["1356"]
        },
        space: {
          symbole: "  -  ",
          dots: ["  -  "]
        },
        "#": {
          symbole: "⠼",
          dots: ["3456"]
        },
        ",": {
          symbole: "⠂",
          dots: ["2"]
        },
        ";": {
          symbole: "⠆",
          dots: ["23"]
        },
        ":": {
          symbole: "⠒",
          dots: ["25"]
        },
        ".": {
          symbole: "⠲",
          dots: ["256"]
        },
        "?": {
          symbole: "⠦",
          dots: ["236"]
        },
        "!": {
          symbole: "⠖",
          dots: ["235"]
        },
        "'": {
          symbole: "⠄⠦",
          dots: ["3", "236"]
        },
        "“": {
          symbole: "⠘⠦",
          dots: ["45", "236"]
        },
        "”": {
          symbole: "⠘⠴",
          dots: ["45", "356"]
        },
        "’": {
          symbole: "⠄⠴",
          dots: ["3", "356"]
        },
        "(": {
          symbole: "⠐⠣",
          dots: ["5", "126"]
        },
        ")": {
          symbole: "⠐⠜",
          dots: ["5", "345"]
        },
        "/": {
          symbole: "⠸⠌",
          dots: ["456", "34"]
        },
        "\\": {
          symbole: "⠸⠡",
          dots: ["456", "16"]
        },
        letter: {
          symbole: "⠰",
          dots: "56"
        },
        caps: {
          symbole: "⠠",
          dots: "6"
        }
      },
      lastCharType: "",
      emptySlot: false
    };
  },
  methods: {
    getCharObj: function(char) {
      var returnChars = [];
      var isPunc = !!char.match(/^[.,:!;?'"()/\\-]/);
      var isSmallCase = !!char.match(/^[a-z]/);
      var isCapCase = !!char.match(/^[A-Z]/);
      var isNumber = !isNaN(char);
      var isSpace = char === " ";
      var obj = { char: char };
      var resultObj = {};

      if (isCapCase) {
        resultObj = Object.assign({}, this.braille[char.toLowerCase()]);

        if (this.lastCharType !== "caps")
          resultObj.dots.unshift(this.braille["caps"].dots);

        this.lastCharType = "caps";
      } else if (isSmallCase) {
        resultObj = Object.assign({}, this.braille[char.toLowerCase()]);

        if (this.lastCharType === "number")
          resultObj.dots.unshift(this.braille["letter"].dots);

        this.lastCharType = "letter";
      } else if (isSpace) {
        resultObj = this.braille["space"];
        this.lastCharType = "space";
      } else if (isNumber) {
        if (this.lastCharType !== "number") {
          let hashObj = Object.assign({ char: "#" }, this.braille["#"]);
          returnChars.push(hashObj);
        }
        this.lastCharType = "number";
        resultObj = this.braille[char];
      } else if (isPunc) {
        resultObj = this.braille[char];
        this.lastCharType = "punc";
      }
      obj = Object.assign(obj, resultObj);
      returnChars.push(obj);
      return returnChars;
    }
  },
  computed: {
    getText: function() {
      if (this.$slots.default === undefined) {
        this.emptySlot = true;
        return "";
      }
      let text = this.$slots.default[0].text.trim();
      let brailleArray = [];
      text.split("").forEach(l => {
        var charObject = this.getCharObj(l);
        brailleArray = brailleArray.concat(charObject);
      });
      return brailleArray;
    }
  }
};
</script>
<style lang='scss'>
.braille-code {
  display: flex;
  flex-wrap: wrap;
  .braille-block {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    transition: all 0.3s;

    &[data-tip="true"]::before {
      content: attr(data-char);
      padding: 0.2em 1.3em;
      background-color: #95a5a6;
      border-radius: 0.1em;
      position: absolute;
      top: 0%;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.3s;
      opacity: 0;
      pointer-events: none;
      font-size: 1em;
      color: white;
      font-weight: bold;
    }

    &[data-tip="true"]:hover {
      box-shadow: 0 0 0.3em 0 rgba(0, 0, 0, 0.1);
      &::before {
        opacity: 1;
        transform: scale(1) translate(-50%, -100%);
      }
    }

    .braille-cell {
      $width: 2em;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      width: $width;
      height: $width * 1.5;
      margin: $width / 5;
      position: relative;
      font-size: 20px;
      // box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);

      > i {
        width: 50%;
        height: 33.3%;
        position: relative;
        &.fill {
          &::before {
            content: "";
            width: 50%;
            height: 50%;
            background-color: black;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    &[data-style="style2"] {
      i {
        &.empty {
          &::before {
            content: "";
            width: 15%;
            height: 15%;
            background-color: black;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    &[data-style="style3"] {
      i {
        &.empty {
          &::before {
            content: "";
            width: 50%;
            height: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }

    &[data-style="style4"] {
      i {
        &.fill {
          &::before {
            content: "";
            width: 70%;
            height: 70%;
            background-color: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.3),
              inset 0 -2px 3px rgba(0, 0, 0, 0.3),
              0 1px 1px rgba(255, 255, 255, 0.9);
          }
        }
      }
    }
  }
}
</style>