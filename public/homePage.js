const logoutBtn = new LogoutButton();
logoutBtn.action = () => {
  ApiConnector.logout(result => {
    if (result.success) {
      location.reload();
    }
  });
}

const user = ApiConnector.current(result => {
  if (result.success) {
    ProfileWidget.showProfile(result.data);
  }
});

const rates = new RatesBoard();
function updateStocks() {
  ApiConnector.getStocks(result => {
    if (result.success) {
      rates.clearTable();
      rates.fillTable(result.data);
    }
  });
}
updateStocks();
setInterval(updateStocks, 60000);

const manager = new MoneyManager();
manager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, result => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      manager.setMessage(result.success, "Счёт успешно пополнен");
    }
    else {
      manager.setMessage(result.success, result.error);
    }
  });
};
manager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, result => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      manager.setMessage(result.success, "Конвертировано успешно");
    }
    else {
      manager.setMessage(result.success, result.error);
    }
  });
};

manager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, result => {
    if (result.success) {
      ProfileWidget.showProfile(result.data);
      manager.setMessage(result.success, "Перевод выполнен");
    }
    else {
      manager.setMessage(result.success, result.error);
    }
  });
};

const favorites = new FavoritesWidget();
ApiConnector.getFavorites(result => {
  if (result.success) {
    favorites.clearTable();
    favorites.fillTable(result.data);
    manager.updateUsersList(result.data);
  }
});
favorites.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, result => {
    if (result.success) {
      favorites.clearTable();
      favorites.fillTable(result.data);
      manager.updateUsersList(result.data);
      favorites.setMessage(result.success, "Пользователь добавлен в адресную книгу");
    }
    else {
      favorites.setMessage(result.success, result.error);
    }
  });
};
favorites.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, result => {
    if(result.success) {
      favorites.clearTable();
      favorites.fillTable(result.data);
      manager.updateUsersList(result.data);
      favorites.setMessage(result.success, "Пользователь удалён из адресной книги");
    }
    else {
      favorites.setMessage(result.success, result.error);
    }
  });
};