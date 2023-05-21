<template>
  <div class="job-tile" :style="{ width: tileWidth + 'px' }">
    <div class="image-with-details" :style="{ width: imageWidth + 'px', height: imageHeight + 'px', borderRadius: borderRadius + 'px' }">
      <div class="image-container">
        <img :src="job.images[0]" alt="Job Image" :style="{ borderRadius: borderRadius + 'px' }" />
      </div>
      <div class="details-container">
        <div class="details-inner">
          <h2>{{ job.name }}</h2>
          <p>{{ truncateDescription(job.description, 75) }}</p>
          <div class="price-and-button">
            <p class="price">€{{ job.price }}/ u</p>
            <Button label="Details" @click="showDetails(job._id)" class="p-button-secondary" />
          </div>
        </div>
      </div>
    </div>
    <DialogJobView v-if="showDialog" @close="showDialog = false" :visible="showDialog" :klusjeId="selectedJobId" />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import DialogJobView from "../components/Dialog/DialogJobView.vue";

const showDialog = ref(false);
const selectedJobId = ref(null);

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  tileWidth: {
    type: Number,
    default: 300,
  },
  imageWidth: {
    type: Number,
    default: 280,
  },
  imageHeight: {
    type: Number,
    default: 186,
  },
  borderRadius: {
    type: Number,
    default: 10,
  },
});

const showDetails = (klusjeId) => {
  selectedJobId.value = klusjeId;
  showDialog.value = true;
};

const truncateDescription = (description, limit) => {
  if (description && description.length > limit) {
    return description.slice(0, limit) + '...';
  }
  return description;
};
</script>
<style>
.job-tile {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 30%; /* Adjust the margin-bottom value as needed */
}

.image-with-details {
  position: relative;
  overflow: visible;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 0;
  height: auto;
}

.image-container {
  display: inline-block;
  vertical-align: middle;
  margin-top: 0px;
  width: 280px;
  height: 186px;
  overflow: hidden;
}

.image-container img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  position: relative;
  z-index: 1;
  border-radius: 10px;
  transform: translateY(-50%);
  top: 50%;
}

.details-container {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1) inset;
}

.details-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.details-inner h2,
.details-inner h3,
.details-inner p {
  margin-top: 0;
  margin-bottom: 10px;
  text-align: left;
}

.details-inner .price {
  margin-top: 20px;
  margin-bottom: 0;
  font-weight: bold;
}

.details-inner .price-and-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-and-button .price {
  margin-top: 0;
  color: #689F38;
  font-size: 1.2rem;
}



</style>