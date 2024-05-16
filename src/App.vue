<script setup lang="ts">
 import PhlikerService from './services/PhlikerService';  
import {ref} from 'vue'
const phlikerService = new PhlikerService();
const search_item = ref('');
const photos = ref();
const errorMessage = ref();
const img_position = ref();
let viewNumber = ref();
viewNumber.value = 1;
const search = (page:number,plus:boolean) => {
	page = plus == true ? page++ : page;
	const res = phlikerService.search(search_item.value,page);
	res.then((value)=>{
		if(plus){
			photos.value = photos.value.concat(value) 
		}else{
			photos.value = value
		}
		
	}).catch((err)=>{
		console.log(err)
		errorMessage.value = err;
	})
	viewNumber.value = 2;
}

const info = ref();
const showDetails = (id:number,position:number) =>{
	const res = phlikerService.getInfo(id);
	res.then((value)=>{
		info.value = value
	})
	img_position.value = position;
	viewNumber.value = 3;
}

const next = () => {
	img_position.value++;
	showDetails(photos.value[img_position.value].id,img_position.value)
}

const prev = () =>{
	img_position.value--;
	showDetails(photos.value[img_position.value].id,img_position.value)
}
</script>

<template>	
  <!-- Navbar -->
	<nav class="navbar navbar-expand bg-dark">
		<a class="navbar-brand float-left w-75">Phliker</a>		
		<div class="input-group float-right w-25">
    		<input type="text" class="form-control" v-model="search_item" placeholder="Search by tags ...">
			<div class="input-group-append">
				<button class="btn btn-secondary my-2 my-sm-0" type="button" @click="search(1,false)">Button</button>
			</div>
    	</div>
	</nav>
	<!-- Main view -->
	<div class="container w-50" id="main-view" v-if="viewNumber == 1">
		<div class="input-group">
    		<input type="text" class="form-control" v-model="search_item" placeholder="Search by tags ...">
			<div class="input-group-append">
				<button class="btn btn-secondary my-2 my-sm-0" type="button" @click="search(1,false)">Button</button>
			</div>
		</div>
	</div>
	<!-- Grid view -->
	<div class="container" id="grid-view" v-if="viewNumber == 2">
			<div class="row">
				<div class="col-12-md col-12-sm" id="view-total">Total photos: {{ photos != undefined ? photos.length : 0 }}</div>
		   	  	<div class="col-12-md col-12-sm" id="grid-images">
					<span v-if="errorMessage == undefined">
						<span v-for="(photo, index) in photos" @click="showDetails(photo.id,index)">
							<img :src="'https://farm'+ photo.farm +'.staticflickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_q.jpg'"/>
						</span>
					</span>
					<span v-else>
						{{ errorMessage !== undefined ? errorMessage.value : ''}}
					</span>
				</div>
		   	  	<div class="col-12-md col-12-sm plus-button-container">
		   	  		<a id="plus-button" class="btn btn-primary text-white m-3" @click="search(1,true)">
						+
		   	  		</a>
		   	  	</div>
		    </div>
	</div>

	<!-- Details view -->
		<div id="details-view" class="container"  v-if="viewNumber == 3">
			<div class="row">
				<div class="col-8">
					<div class="carousel slide" data-ride="carousel">
					  <div class="carousel-inner">
					    <div class="carousel-item active w-100" id="img-preview">
							<img class="d-block img-fluid w-100" :src="'https://farm' + photos[img_position].farm + '.staticflickr.com/' + photos[img_position].server + '/' + photos[img_position].id + '_' + photos[img_position].secret + '.jpg'"/>
						</div>
					  </div>
					  <a class="carousel-control-prev" id="show-previous-image" role="button" @click="next">
					    &lt;
					  </a>
					  <a class="carousel-control-next" id="show-next-image" role="button" @click="prev">&gt;</a>
					</div>	
				</div>
				
				<div class="col-4">
					<table class="table">
						<tr>
							<th>Owner</th>
							<td id="owner">{{ info.photo.owner.realname != '' ?  info.photo.owner.realname : info.photo.owner.username}}</td>
						</tr>
						<tr>
							<th>Country</th>
							<td id="country">{{ info.photo.location != undefined ? info.photo.location.country._content : info.photo.owner.location }}</td>
						</tr>
						<tr>
							<th>Region</th>
							<td id="region">{{ info.photo.location != undefined ? info.photo.location.region._content : info.photo.owner.location }}</td>
						</tr>
						<tr>
							<th>Description</th>
							<td id="title_detail">{{ info.photo.title._content }}</td>
						</tr>
					</table>
				</div>
			
			</div>
		</div>

</template>