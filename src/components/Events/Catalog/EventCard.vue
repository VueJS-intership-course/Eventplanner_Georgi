<template>
    <article class="postcard light red">
        <div class="postcard__img_link">
            <img class="postcard__img" :src="eventData.imgSrc" :alt="eventData.name" />
        </div>
        <div class="postcard__text t-dark">
            <h1 class="postcard__title red">{{ eventData.name }}</h1>
            <div class="postcard__subtitle small">
                <span>{{ $formatDateInTimeZone(eventData.dateTime) }}</span>
                <p v-if="isEventExpired" class="fw-bold text-danger">Event Date Expired</p>
            </div>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus
                nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam
                adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi,
                illum quos!</div>
            <ul class="postcard__tagbox">
                <li class="tag__item">Country: {{ eventData.country }}</li>
                <template v-if="eventData.ticket">
                    <li class="tag__item">Ticlets available: {{ eventData.ticket }}</li>
                    <li class="tag__item">Price: {{ eventData.price }}$</li>
                </template>
                <li v-if="!eventData.ticket" class="tag__item fw-bold text-danger">SOLD OUT!</li>
                <li class="tag__item">
                    <router-link :to="{ name: 'Single-Event', params: { id: eventData.id } }"
                        class="btn btn-outline-primary">See details</router-link>
                </li>
            </ul>
        </div>
    </article>
</template>


<script setup>
/*
   props
*/
import { computed } from 'vue';

const props = defineProps({
    eventData: {
        type: Object,
        required: true
    }
});


/*
   is event expired
*/
const isEventExpired = computed(() => new Date() > new Date(props.eventData.date));

</script>


<style scoped lang="scss">
.postcard {
    flex-wrap: wrap;
    display: flex;

    box-shadow: 0 4px 21px -12px rgba(0, 0, 0, 0.66);
    border-radius: 10px;
    margin: 0 0 2rem 0;
    overflow: hidden;
    position: relative;
    color: black;
    height: 23rem;

    &.light {
        background-color: #e1e5ea;
    }

    h1,
    .h1 {
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
    }

    .small {
        font-size: 80%;
    }

    .postcard__title {
        font-size: 1.75rem;
    }

    .postcard__img {
        max-height: 180px;
        width: 100%;
        object-fit: cover;
        position: relative;
    }

    .postcard__img_link {
        display: contents;
    }

    .postcard__bar {
        width: 50px;
        height: 10px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #424242;
        transition: width 0.2s ease;
    }

    .postcard__text {
        padding: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .postcard__preview-txt {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: justify;
        height: 100%;
    }

    .postcard__tagbox {
        display: flex;
        flex-flow: row wrap;
        font-size: 14px;
        margin: 20px 0 0 0;
        padding: 0;
        justify-content: center;
        vertical-align: middle;

        .tag__item {
            display: inline-block;
            border-radius: 3px;
            padding: 2.5px 10px;
            margin: 0 5px 5px 0;
            cursor: default;
            user-select: none;
            transition: all 0.3s;

            &:hover {
                transform: translateY(-5px);
            }
        }
    }

    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(-70deg, #424242, transparent 50%);
        opacity: 1;
        border-radius: 10px;
    }

    &:hover .postcard__bar {
        width: 100px;
    }
}

@media screen and (min-width: 769px) {
    .postcard {
        flex-wrap: inherit;

        .postcard__title {
            font-size: 2rem;
        }

        .postcard__tagbox {
            justify-content: start;
        }

        .postcard__img {
            max-width: 300px;
            max-height: 100%;
            transition: transform 0.3s ease;
        }

        .postcard__text {
            padding: 3rem;
            width: 100%;
        }

        .media.postcard__text:before {
            content: "";
            position: absolute;
            display: block;
            background: #18151f;
            top: -20%;
            height: 130%;
            width: 55px;
        }

        &:hover .postcard__img {
            transform: scale(1.1);
        }

        &:nth-child(2n+1) {
            flex-direction: row;
        }

        &:nth-child(2n+0) {
            flex-direction: row-reverse;
        }

        &:nth-child(2n+1) .postcard__text::before {
            left: -12px !important;
            transform: rotate(4deg);
        }

        &:nth-child(2n+0) .postcard__text::before {
            right: -12px !important;
            transform: rotate(-4deg);
        }
    }
}

@media screen and (min-width: 1024px) {
    .postcard__text {
        padding: 2rem 3.5rem;
    }

    .postcard__text:before {
        content: "";
        position: absolute;
        display: block;

        top: -20%;
        height: 130%;
        width: 55px;
    }

    .postcard.dark {
        .postcard__text:before {
            background: #18151f;
        }
    }

    .postcard.light {
        .postcard__text:before {
            background: #e1e5ea;
        }
    }
}

/* COLORS */
.postcard .postcard__tagbox .green.play:hover {
    background: $main-green;
    color: black;
}

.green .postcard__title:hover {
    color: $main-green;
}

.green .postcard__bar {
    background-color: $main-green;
}

.green::before {
    background-image: linear-gradient(-30deg,
            $main-green-rgb-015,
            transparent 50%);
}

.green:nth-child(2n)::before {
    background-image: linear-gradient(30deg, $main-green-rgb-015, transparent 50%);
}

.postcard .postcard__tagbox .blue.play:hover {
    background: $main-blue;
}

.blue .postcard__title:hover {
    color: $main-blue;
}

.blue .postcard__bar {
    background-color: $main-blue;
}

.blue::before {
    background-image: linear-gradient(-30deg, $main-blue-rgb-015, transparent 50%);
}

.blue:nth-child(2n)::before {
    background-image: linear-gradient(30deg, $main-blue-rgb-015, transparent 50%);
}

.postcard .postcard__tagbox .red.play:hover {
    background: $main-red;
}

.red .postcard__title:hover {
    color: $main-red;
}

.red .postcard__bar {
    background-color: $main-red;
}

.red::before {
    background-image: linear-gradient(-30deg, $main-red-rgb-015, transparent 50%);
}

.red:nth-child(2n)::before {
    background-image: linear-gradient(30deg, $main-red-rgb-015, transparent 50%);
}

.postcard .postcard__tagbox .yellow.play:hover {
    background: $main-yellow;
    color: black;
}

.yellow .postcard__title:hover {
    color: $main-yellow;
}

.yellow .postcard__bar {
    background-color: $main-yellow;
}

.yellow::before {
    background-image: linear-gradient(-30deg,
            $main-yellow-rgb-015,
            transparent 50%);
}

.yellow:nth-child(2n)::before {
    background-image: linear-gradient(30deg,
            $main-yellow-rgb-015,
            transparent 50%);
}

@media screen and (min-width: 769px) {
    .green::before {
        background-image: linear-gradient(-80deg,
                $main-green-rgb-015,
                transparent 50%);
    }

    .green:nth-child(2n)::before {
        background-image: linear-gradient(80deg,
                $main-green-rgb-015,
                transparent 50%);
    }

    .blue::before {
        background-image: linear-gradient(-80deg,
                $main-blue-rgb-015,
                transparent 50%);
    }

    .blue:nth-child(2n)::before {
        background-image: linear-gradient(80deg, $main-blue-rgb-015, transparent 50%);
    }

    .red::before {
        background-image: linear-gradient(-80deg, $main-red-rgb-015, transparent 50%);
    }

    .red:nth-child(2n)::before {
        background-image: linear-gradient(80deg, $main-red-rgb-015, transparent 50%);
    }

    .yellow::before {
        background-image: linear-gradient(-80deg,
                $main-yellow-rgb-015,
                transparent 50%);
    }

    .yellow:nth-child(2n)::before {
        background-image: linear-gradient(80deg,
                $main-yellow-rgb-015,
                transparent 50%);
    }
}
</style>