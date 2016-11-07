export const showCheckBoxOnClick = function() {
  const checkBoxes = ['Google', 'Bing', 'Tartu'];

  checkBoxes.forEach(function(item) {
    console.error("Item", item);
    document.appendChild('<p>' + item + '</p>');
  });
};
