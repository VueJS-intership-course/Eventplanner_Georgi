<template>
    <article class="postcard dark blue">
        <a class="postcard__img_link" href="#">
            <img class="postcard__img" :src="eventData.imgSrc" alt="Image Title" />
        </a>
        <div class="postcard__text">
            <h1 class="postcard__title blue"><a href="#">{{ eventData.title }}</a></h1>
            <div class="postcard__subtitle small">
                <time datetime="2020-05-25 12:00:00">
                    <i class="fas fa-calendar-alt mr-2"></i>{{ eventData.date }} / {{ eventData.time }} 
                </time>
            </div>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">{{ eventData.description }}</div>
            <ul class="postcard__tagbox">
                <li class="tag__item"><i class="fas fa-tag mr-2"></i>Podcast</li>
                <li class="tag__item"><i class="fas fa-clock mr-2"></i>55 mins.</li>
                <li class="tag__item play blue">
                    <a href="#"><i class="fas fa-play mr-2"></i>Play Episode</a>
                </li>
            </ul>
        </div>
    </article>
</template>


<script setup>
/*
   props
*/

const props = defineProps({
    eventData: {
        type:Object,
        required:true
    }
})
</script>