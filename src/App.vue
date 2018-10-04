<template>
  <div id="app" class="page-container md-layout md-alignment-top-center">
    
    <md-app md-waterfall md-mode="fixed" class="md-layout-item md-size-50 md-xsmall-size-100 md-small-size-65">
      <md-app-toolbar class="md-primary">
        <img src="./assets/f1_logo.svg" alt="Formula 1" class="md-layout-item md-size-20" />
        <router-link to="/" class="md-title">Home</router-link>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss">
  body {
    overflow-y: scroll;
    background: url('assets/bg.jpg') no-repeat center center fixed;
    background-size: cover;
  }
  #app {
    .md-title, h1, h2, h3,
    .md-list-item {
      font-family: 'F1'
    }

    .md-app {
      background-color: transparent;
    }

    .md-app-content {
      position: relative;
      border: none;
      padding: 0;
      background-color: transparent;
    }

    .md-progress-bar {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 1;
    }
    
    .md-content.heading {
      overflow: hidden;
      // margin-top: -16px;
    }

    .md-list {
      padding: 0;
      background-color: transparent;

      .md-list-item {
        position: relative;
        margin: 20px 0 20px 0;
        background-color: #fff;
      }

      .md-list-item-content {
        justify-content: start;
      }
    }
  }
</style>
