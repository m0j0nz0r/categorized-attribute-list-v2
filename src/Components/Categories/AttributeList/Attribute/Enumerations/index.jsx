import React from 'react';

export default (locals) => {
  let input;
  const addItem = () => {
    const value = input.value;
    if (value) {
      locals.onChange(
        [...locals.value, value],
        locals.items.map(item => item.key),
        [...locals.path, ''],
        'add',
      );
      input.value = '';
    }
  };
  return (
    <div>
      <input ref={(element) => { input = element; }} type="string" />
      <button type={locals.add.type} onClick={addItem}>{locals.add.label}</button>
      {locals.items.map(
        (item, index) => (
          <div key={item.key}>
            <button type={item.buttons[0].type} onClick={item.buttons[0].click}>x</button>
            {locals.value[index]}
            <div style={{ display: 'none' }}>{item.input}</div>
          </div>
        ),
      )}
    </div>
  );
};
