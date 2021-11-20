$(document).ready(function () {

    $("form").submit(function (event) {
        event.preventDefault()

        let valueInput = $("#superHeroInput").val();

        $.ajax({
            type: "GET",
            url: "https://superheroapi.com/api/10225552307812018/" + valueInput,//verificar que que extencion Cors esta activa
            dataType: 'json',
            success: function (data) {

                /*console.log(data)*/
                //variables caracteristicas
                let nombre = data.name;
                let imagen = data.image.url;
                let genero = data.appearance.race;
                let peso = data.appearance.weight;
                let altura = data.appearance.height;
                let ocupacion = data.work.occupation;
                let alianzas = data.biography.aliases;
                let conecciones = data.connections.relatives;


                //variables estadisticas
                let inteligencia = data.powerstats.intelligence;
                let fuerza = data.powerstats.strength;
                let velocidad = data.powerstats.speed;
                let resistencia = data.powerstats.durability;
                let poder = data.powerstats.power;
                let combate = data.powerstats.combat;


                // muestra la informacion del herue
                $("#infoHero").html(`

                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                    <h4 class="card-title">SuperHero Encontrado</h4>
                      <h5 class="card-title">${"Nombre: " + nombre}</h5>
                      <p class="card-text">${"Ocupacion: " + ocupacion}</p>
                      <p class="card-text">${"Conecciones: " + conecciones}</p>
                      <p class="card-text"><small class="text-muted">${"Raza: " + genero}</small></p>
                      <p class="card-text"><small class="text-muted">${"Altura: " + altura}</small></p>
                      <p class="card-text"><small class="text-muted">${"Peso: " + peso}</small></p>
                      <p class="card-text"><small class="text-muted">${"Alianzas: " + alianzas}</small></p>
                    </div>
                  </div>
                </div>
              </div>
                       
            
            `)



                //aqui se genera la grafica con CanvasJS

                var chart = new CanvasJS.Chart("stadHero", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas de poder para " + nombre
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: [
                            { y: inteligencia, label: "Inteligencia" },
                            { y: fuerza, label: "Fuerza" },
                            { y: velocidad, label: "Velocidad" },
                            { y: resistencia, label: "Resistencia" },
                            { y: poder, label: "Poder" },
                            { y: combate, label: "Combate" }

                        ]
                    }]
                });
                chart.render();

            },

            error: function(error){
              console.log(error)
          },

        });


    });


});