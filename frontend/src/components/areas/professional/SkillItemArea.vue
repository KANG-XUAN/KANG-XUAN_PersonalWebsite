<template>
	<div class="accordion-item">
		<h2 class="accordion-header" :id="'heading-' + id">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
				:data-bs-target="'#' + id" aria-expanded="false" :aria-controls="id">
				<img :src="imgSrc" :alt="title" class="card-img-top"
					style="width: 50px; height: 50px; margin-right: 10px" />
				{{ title }}
			</button>
		</h2>
		<div :id="id" class="accordion-collapse collapse" :aria-labelledby="'heading-' + id"
			data-bs-parent="#skillsAccordion">
			<div class="accordion-body">
				<p>{{ description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SkillItem',
	props: ['id', 'title', 'imgSrc', 'description']
}
</script>