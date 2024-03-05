<template>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="(crumb, index) in breadcrumbs" :key="index">
          <div style="display: inline-block;"> 
            <span :to="{ path: crumb.path }" v-if="!crumb.active">{{ crumb.text }}</span>
            <span v-else>{{ crumb.text }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </template>
  
  
  <script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(p => p);
  const breadcrumbs = [];
  let path = '';

  for (let i = 0; i < paths.length; i++) {
    path += `/${paths[i]}`;
    const text = capitalizeFirstLetter(paths[i]);

    breadcrumbs.push({
      text: text, 
      path: i < paths.length - 1 ? path : '',
      active: i === paths.length - 1,
    });
  }

  return breadcrumbs;
});
</script>

  <style scoped lang="scss">
  @import '_styles.scss';
    .breadcrumb-item{background-color: $color-terciario;color: $color-quinto}
</style>