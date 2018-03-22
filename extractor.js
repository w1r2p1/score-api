[...document.querySelector('div[data-type=container]').children]
  .filter(x => x.attributes['data-type'])
  .reduce(
    (acc, row) => {
      const type = row.attributes['data-type'].value;
      if (type === 'stg') {
        const id = row.attributes['data-stg-id'].value;
        const date = row.attributes['data-id'].value;

        if (acc.meta.id !== id) {
          const name = row.children[0].children[0].innerText;
          acc.meta = Object.assign(acc.meta, { id, name, date });
        }
        if (acc.meta.date !== date) {
          acc.meta.date = date;
        }
      }
      if (type === 'evt') {
        const [home, away] = [...row.querySelectorAll('.ply.name')].map(x =>
          x.innerText.trim()
        );
        const min = row.querySelector('.min').innerText.trim();
        const score = row.querySelector('.sco').innerText.trim();
        const match = {
          home,
          away,
          score,
          min,
          score
        };
        acc.values.push(Object.assign(match, acc.meta));
      }
      return acc;
    },
    { values: [], meta: { id: null, date: null, name: null } }
  ).values;
