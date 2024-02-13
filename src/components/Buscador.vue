<template>

  <p>{{ route.query.cadena }}</p>
</template>

<script setup>
import { ref } from 'vue';
import {useRoute}  from 'vue-router';
const route=useRoute();


</script>