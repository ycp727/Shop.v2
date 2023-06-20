<template>
  <q-page class="">
    <div class="q-pa-md">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="~/assets/Cactus.png" />
        <q-carousel-slide :name="2" img-src="~/assets/nubes.png" />
        <q-carousel-slide :name="3" img-src="~/assets/no_user_login.png" />
        <q-carousel-slide
          :name="4"
          img-src="~/assets/quasar-logo-vertical.svg"
        />
      </q-carousel>
    </div>

    <div class="row-12">
      <q-card
        class="text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6 text-center">
            ¡Bienvenidos a nuestra tienda de cactus!
          </div>
          <div class="text-subtitle2 text-justify">
            Los cactus son plantas únicas y fascinantes que pueden agregar un
            toque de exotismo y belleza a cualquier hogar. Para ayudarte a
            mantener tus cactus saludables y felices, hemos compilado algunos
            consejos y sugerencias útiles sobre cómo cuidarlos adecuadamente.
          </div>
        </q-card-section>
        <q-separator dark />
      </q-card>
    </div>

    <q-card class="row-12">
      <q-card-section horizontal>
        <q-img class="col-5" src="~/assets/Cactus.png" />

        <q-card-section>
          <div class="text-subtitle2 text-justify">
            En nuestra tienda, nos apasiona ofrecer una amplia variedad de
            cactus únicos y fascinantes para que puedas agregar un toque de
            exotismo a tu hogar. Ya sea que estés buscando una planta pequeña
            para tu escritorio o un cactus grande para tu jardín, estamos
            seguros de que encontrarás algo que te encantará en nuestra
            selección.
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="row-12">
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-subtitle2 text-justify">
            Además de ofrecer cactus de alta calidad, también nos comprometemos
            a brindar un excelente servicio al cliente. Si tienes alguna
            pregunta o necesitas ayuda para elegir el cactus adecuado para ti,
            nuestro equipo de expertos estará encantado de ayudarte.
          </div>
        </q-card-section>
        <q-img class="col-5" src="~/assets/Cactus.png" />
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="row-12">
      <q-card-section horizontal>
        <q-img class="col-5" src="~/assets/Cactus.png" />

        <q-card-section>
          <div class="text-subtitle2 text-justify">
            Comprar en nuestra tienda es fácil y conveniente. Simplemente navega
            por nuestra selección en línea, agrega los cactus que te gusten a tu
            carrito de compras y completa el pago seguro en unos pocos clics.
            Luego, enviaremos tus cactus directamente a tu puerta en el plazo de
            entrega acordado.
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="row-12">
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-subtitle2 text-justify">
            No importa si eres un coleccionista experimentado o simplemente
            estás buscando agregar algo de verde a tu hogar, estamos seguros de
            que encontrarás algo que te encantará en nuestra tienda de cactus.
            ¡Gracias por considerarnos para tu próxima compra de plantas!
          </div>
        </q-card-section>
        <q-img class="col-5" src="~/assets/Cactus.png" />
      </q-card-section>
      <q-separator />
    </q-card>

    <div class="row-12">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">Cuidados de los cactus</div>
          <div class="text-subtitle2 text-justify">
            Los cactus son plantas únicas y fascinantes que pueden agregar un
            toque de exotismo y belleza a cualquier hogar. Para ayudarte a
            mantener tus cactus saludables y felices, hemos compilado algunos
            consejos y sugerencias útiles sobre cómo cuidarlos adecuadamente.
          </div>
        </q-card-section>
        <q-separator dark />
      </q-card>
    </div>

    <div class="q-pa-md row">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Identifica los tipos de cactus:</div>
          <div class="text-subtitle2 text-justify">
            Es importante conocer los diferentes tipos de cactus que vendemos y
            las necesidades específicas de cada uno. Algunos cactus necesitan
            más agua que otros, algunos necesitan más luz solar directa y otros
            necesitan menos. Asegúrate de leer las etiquetas de los cactus que
            compres y seguir las instrucciones de cuidado específicas para cada
            tipo.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Riega con moderación:</div>
          <div class="text-subtitle2 text-justify">
            Los cactus son plantas que almacenan agua y no necesitan ser regados
            con frecuencia. En general, es mejor regar los cactus una vez a la
            semana en primavera y verano, y una vez cada dos o tres semanas en
            otoño e invierno. Asegúrate de que el suelo se seque completamente
            antes de volver a regar.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">
            Proporciona la cantidad adecuada de luz solar:
          </div>
          <div class="text-subtitle2 text-justify">
            A la mayoría de los cactus les gusta la luz solar directa, pero
            algunos tipos prefieren la sombra parcial. Asegúrate de ubicar tus
            cactus en un lugar donde reciban suficiente luz solar, pero evita
            exponerlos a la luz solar directa durante largos períodos de tiempo,
            ya que esto puede quemar las hojas y los tallos.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Utiliza el suelo adecuado:</div>
          <div class="text-subtitle2 text-justify">
            Los cactus prefieren un suelo bien drenado que les permita crecer
            sin estar demasiado húmedos. Puedes comprar suelo especial para
            cactus en una tienda de jardinería o mezclar tu propio suelo con
            arena y perlita.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
