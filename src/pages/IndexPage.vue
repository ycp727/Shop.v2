<template>
  <q-page class="padding">
    <div class="q-pa-md">
      <q-carousel
        style="height: 250px"
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

    <q-card class="text-white row-12 cardbar bg-teal q-pa q-ma-md">
      <q-card-section>
        <div class="text-h4 text-center q-ma-md text-dark text-weight-bold">
          ¡Bienvenidos a nuestra tienda de cactus!
        </div>
        <q-separator dark />
        <div class="text-subtitle1 text-center">
          Los cactus son plantas únicas y fascinantes que pueden agregar un
          toque de exotismo y belleza a cualquier hogar. Para ayudarte a
          mantener tus cactus saludables y felices, hemos compilado algunos
          consejos y sugerencias útiles sobre cómo cuidarlos adecuadamente.
        </div>
      </q-card-section>
      <q-separator dark />
    </q-card>

    <q-card class="bg-white">
      <q-card-section horizontal class="items-center">
        <q-img class="col-4 q-ma-xs cardimgW" src="~/assets/Cactus.png" />

        <q-card-section>
          <p class="text-h6 text-justify q-pa-md">
            En nuestra tienda, nos apasiona ofrecer una amplia variedad de
            cactus únicos y fascinantes para que puedas agregar un toque de
            exotismo a tu hogar. Ya sea que estés buscando una planta pequeña
            para tu escritorio o un cactus grande para tu jardín, estamos
            seguros de que encontrarás algo que te encantará en nuestra
            selección.
          </p>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="bg-dark">
      <q-card-section horizontal class="items-center">
        <q-card-section>
          <p class="text-h6 text-justify q-pa-md text-white">
            Además de ofrecer cactus de alta calidad, también nos comprometemos
            a brindar un excelente servicio al cliente. Si tienes alguna
            pregunta o necesitas ayuda para elegir el cactus adecuado para ti,
            nuestro equipo de expertos estará encantado de ayudarte.
          </p>
        </q-card-section>
        <q-img class="col-4 q-ma-xs cardimgB" src="~/assets/Cactus.png" />
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="bg-white">
      <q-card-section horizontal class="items-center">
        <q-img class="col-4 q-ma-xs cardimgW" src="~/assets/Cactus.png" />

        <q-card-section>
          <p class="text-h6 text-justify q-pa-m">
            Comprar en nuestra tienda es fácil y conveniente. Simplemente navega
            por nuestra selección en línea, agrega los cactus que te gusten a tu
            carrito de compras y completa el pago seguro en unos pocos clics.
            Luego, enviaremos tus cactus directamente a tu puerta en el plazo de
            entrega acordado.
          </p>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="bg-dark">
      <q-card-section horizontal class="items-center">
        <q-card-section>
          <div class="text-h6 text-justify q-pa-md text-white">
            No importa si eres un coleccionista experimentado o simplemente
            estás buscando agregar algo de verde a tu hogar, estamos seguros de
            que encontrarás algo que te encantará en nuestra tienda de cactus.
            ¡Gracias por considerarnos para tu próxima compra de plantas!
          </div>
        </q-card-section>
        <q-img class="col-4 q-ma-xs cardimgB" src="~/assets/Cactus.png" />
      </q-card-section>
      <q-separator />
    </q-card>

    <q-card class="text-white row-12 cardbar bg-teal q-pa q-ma-md">
      <q-card-section>
        <div class="text-h4 text-center q-ma-md text-dark text-weight-bold">
          Cuidados de los cactus
        </div>
        <q-separator dark />
        <p class="text-subtitle1 text-center">
          Los cactus son plantas únicas y fascinantes que pueden agregar un
          toque de exotismo y belleza a cualquier hogar. Para ayudarte a
          mantener tus cactus saludables y felices, hemos compilado algunos
          consejos y sugerencias útiles sobre cómo cuidarlos adecuadamente.
        </p>
      </q-card-section>
    </q-card>

    <div class="q-pa-md row q-gutter-lg justify-around">
      <q-card class="my-card bg-green-1">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder">
            Identifica los tipos de cactus:
          </div>
          <q-separator inset />
          <div class="text-subtitle1 text-justify">
            Es importante conocer los diferentes tipos de cactus que vendemos y
            las necesidades específicas de cada uno. Algunos cactus necesitan
            más agua que otros, algunos necesitan más luz solar directa y otros
            necesitan menos. Asegúrate de leer las etiquetas de los cactus que
            compres y seguir las instrucciones de cuidado específicas para cada
            tipo.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-green-5">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder">
            Riega con moderación:
          </div>
          <q-separator spaced />
          <div class="text-subtitle1 text-justify">
            Los cactus son plantas que almacenan agua y no necesitan ser regados
            con frecuencia. En general, es mejor regar los cactus una vez a la
            semana en primavera y verano, y una vez cada dos o tres semanas en
            otoño e invierno. Asegúrate de que el suelo se seque completamente
            antes de volver a regar.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-green-5">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder">
            Proporciona la cantidad adecuada de luz solar:
          </div>
          <q-separator spaced />
          <div class="text-subtitle1 text-justify">
            A la mayoría de los cactus les gusta la luz solar directa, pero
            algunos tipos prefieren la sombra parcial. Asegúrate de ubicar tus
            cactus en un lugar donde reciban suficiente luz solar, pero evita
            exponerlos a la luz solar directa durante largos períodos de tiempo,
            ya que esto puede quemar las hojas y los tallos.
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card bg-green-7">
        <q-card-section>
          <div class="text-h6 text-center text-weight-bolder">
            Utiliza el suelo adecuado:
          </div>
          <q-separator spaced />
          <div class="text-subtitle1 text-justify">
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

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
</script>
<style lang="scss" scoped>
.cardimgB {
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.cardimgW {
  background: rgba(0, 0, 0, 0.614);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.cardbar {
  background: rgba(174, 190, 31, 0.614);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 5px solid rgba(0, 27, 0, 0.589);
}
.my-card {
  width: 100%;
  max-width: 280px;
  background: rgba(255, 255, 255, 0.614);
  border-radius: 20px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
</style>
