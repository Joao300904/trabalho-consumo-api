const content = document.getElementById('detail');
let id = Number(window.location.hash.replace('#', ''));
let maxId = 0;

async function getCharacterDetail() {

  const totalRes = await fetch('https://rickandmortyapi.com/api/character');
  const totalData = await totalRes.json();
  maxId = totalData.info.count;

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await res.json();

  let locationName = character.location?.name || 'Desconhecido';
  let dimension = 'Desconhecida';

  if (character.location?.url) {
    try {
      const locRes = await fetch(character.location.url);
      if (locRes.ok) {
        const loc = await locRes.json();
        dimension = loc.dimension || 'Desconhecida';
      }
    } catch {}
  }

  let buttons = '';
  if (id > 1) {
    buttons += `<button onclick="prev()">Anterior</button>`;
  }
  buttons += `<button onclick="goToList()">Voltar à lista</button>`;
  if (id < maxId) {
    buttons += `<button onclick="next()">Próximo</button>`;
  }

  content.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" />
    <ul>
      <li><strong>Espécie:</strong> ${character.species}</li>
      <li><strong>Gênero:</strong> ${character.gender}</li>
      <li><strong>Status:</strong> ${character.status}</li>
      <li><strong>Mundo:</strong> ${locationName}</li>
      <li><strong>Dimensão:</strong> ${dimension}</li>
    </ul>
    <div>${buttons}</div>
  `;
}

function next() {
  id = id + 1;
  window.location.hash = "#" + id;
  window.location.reload();
}

function prev() {
  if (id > 1) {
    id = id - 1;
    window.location.hash = "#" + id;
    window.location.reload();
  }
}

function goToList() {
  window.location.href = 'index.html#1';
}

getCharacterDetail();

/**
 * Buscar o personagem especifico e trazer os seguintes dados:
 * nome
 * imagem
 * especie
 * gênero
 * mundo/dimensão
 * status
 * 1 ponto extra pra quem colocar o link para detail la na index
 * **/