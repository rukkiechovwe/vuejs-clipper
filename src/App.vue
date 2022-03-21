<template>
  <div id="app">
    <h1 class="center">Crop Image</h1>
    <p class="center">
      Add crop image feature in your projects using vuejs-clipper
    </p>
    <clipper-upload v-model="profilePic" :check="true" class="image-group"
      ><span class="text"> Select Image </span></clipper-upload
    >
    <div class="modal" v-if="imageModal">
      <div class="popup">
        <div>
          <div class="row">
            <div class="half">
              <h3 class="title">Crop Image</h3>
              <span class="info">* Image must be less than 2mb</span>
              <p>
                <span class="bold">on PC:</span>
                <span class="info">* mouse: Drag image.</span>
              </p>
              <!-- <p class="info">* mouse wheel: Zoom image.</p> -->
              <!-- <br /> -->
              <p>
                <span class="bold">on Mobile</span>
                <span class="info">* touch: Drag image.</span>
              </p>
              <!-- <p class="info">* two fingers: Zoom image.</p> -->
            </div>
            <div class="half">
              <h3>Preview Image</h3>
            </div>
          </div>
        </div>
        <div class="row pt-4 clipper">
          <div class="half">
            <clipper-basic
              :src="profilePic"
              preview="test"
              ref="clipper"
              :border="3"
              :init-width="100"
              :init-height="100"
              shadow="rgba(0,0,0,0)"
              :rotate="0"
              :grid="false"
              bg-color="white"
              border-color="white"
              class="box"
              ><div class="placeholder" slot="placeholder">
                No image
              </div></clipper-basic
            >
          </div>
          <div class="half pt-4 pt-sm-0">
            <clipper-preview name="test" :src="profilePic" class="preview-box"
              ><div class="placeholder" slot="placeholder">
                No image
              </div></clipper-preview
            >
          </div>
        </div>
        <div class="btn-wrap">
          <button @click="close">close</button>
          <button
            class="ml-3 submit"
            @click="
              (e) => {
                e.preventDefault();
                clipImage(
                  userData.firstName,
                  userData.middleName,
                  userData.lastName
                );
              }
            "
          >
            <!-- Continue -->
            Upload Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      profilePic: null,
      imageSrc: null,
      imageModal: false,
    };
  },
  methods: {
    clipImage() {
      let vm = this;
      const canvas = this.$refs.clipper.clip();
      canvas.toBlob(function (blob) {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          const file = new File([blob], `$profile-picture`, {
            type: "image/png",
          });
          console.log(file);
          if (file.size > 2120000) {
            alert("File size must be less that 2mb");
            vm.imageModal = false;
            return;
          } else {
            alert("send image to server");
            // send file to server
          }
        });
        reader.readAsDataURL(blob);
      });
    },
    close() {
      // if (this.profilePic) {
      //   this.clipImage();
      // }
      return (this.imageModal = false);
    },
  },
  watch: {
    profilePic: function (val) {
      if (val) {
        this.imageModal = true;
      }
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto Light"), local("Roboto-Light"),
    url("/fonts/Roboto-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: url("/public/fonts/Roboto-Regular.eot");
  src: local("Roboto"), local("Roboto-Regular"),
    url("/fonts/Roboto-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: local("Roboto Medium"), local("Roboto-Medium"),
    url("/fonts/Roboto-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: "Roboto";
  src: local("Roboto Bold"), local("Roboto-Bold"),
    url("/fonts/Roboto-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
h1 {
  margin: 10px 0;
}
p {
  margin: 5px 0;
}
#app {
  font-family: "Roboto";
  margin: 0 auto;
  display: block;
  max-width: 400px;
  width: 100%;
}
.image-group {
  /* width: 100%;
  max-width: 250px; */
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  position: relative;
  color: #007afb;
  cursor: pointer;
  height: 25px;
  margin-top: 25px;
}
.image {
  opacity: 0;
  appearance: none;
  width: 100%;
  z-index: 99;
  position: absolute;
  height: 100%;
  width: 100%;
}
.text {
  position: absolute;
  left: 10px;
  right: 12px;
  top: 12px;
  bottom: 10px;
  text-align: center;
  font-weight: 600;
  max-width: 100%;
  height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: auto;
  white-space: nowrap;
}
.center {
  text-align: center;
}
.row {
  display: flex;
}
.half {
  width: 50%;
}
.clipper {
  padding-top: 1rem;
}
.modal {
  /* height: 100%;
  width: 99%; */
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(26, 26, 26, 0.39);
  z-index: 99;
  overflow: auto;
  display: flex;
  padding: 24px 16px;
  color: #000;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
}
.popup {
  background: #e0efff;
  padding: 5px 20px 20px;
  width: 100%;
  max-width: 750px;
  border-radius: 5px;
  margin: auto;
}
.btn-wrap {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 30px;
}
button {
  background: #f33;
  border: none;
  padding: 9px 15px;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  font-size: 17px;
  text-transform: capitalize;
}
.submit {
  background: #23aa07;
  margin-left: 10px;
}
.bold {
  font-weight: 600;
  margin: 0;
  padding-top: 5px;
}
.info {
  font-style: italic;
  color: #7d7d7d;
  margin: 0;
  font-size: 13px;
  line-height: 24px;
}
.box {
  max-width: 230px;
  width: 230px;
}
.preview-box {
  max-width: 330px;
  width: 330px;
}

@media screen and (max-width: 600px) {
  .box {
    max-width: 100%;
    width: 100%;
  }
  .row {
    flex-direction: column;
  }
  .half {
    width: 100%;
  }
  .clipper > div:last-child {
    padding-top: 1rem;
  }
}
</style>
