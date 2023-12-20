const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  SEND: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные.',
  SEND: 'Не удалось отправить форму.',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch (() => {
      throw new Error(errorText);
    }); //.then((data) => data);

const getPictures = () => {
  load(Route.GET, ErrorText.GET,);
};

const sendPictures = (body) => {
  load(Route.SEND, ErrorText.SEND, Method.POST, body);
};

export { getPictures, sendPictures };
