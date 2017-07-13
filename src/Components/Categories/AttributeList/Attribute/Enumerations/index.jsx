import React from 'react';

export default (locals) => {
  const addItem = () => {
    const value = this.input.value;
    if (value) {
      locals.onChange(
        [...locals.value, ...[value]],
        locals.items.map(i => i.key),
        [...locals.path, ...['']],
        'add',
      );
      this.input.value = '';
    }
  };
  return (
    <div>
      <input ref={(input) => { this.input = input; }} type="string" />
      <button type={locals.add.type} onClick={addItem}>{locals.add.label}</button>
      {locals.items.map(
        (i, index) => (
          <div key={i.key}>
            <button type={i.buttons[0].type} onClick={i.buttons[0].click}>x</button>
            {locals.value[index]}
          </div>
        ),
      )}
    </div>
  );
};
