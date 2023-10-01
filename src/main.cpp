// Copyright (C) 2021 The Qt Company Ltd.
// SPDX-License-Identifier: LicenseRef-Qt-Commercial OR GPL-3.0-only

#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>

#include "app_environment.h"
#include "filereader.h"
#include "import_qml_components_plugins.h"
#include "import_qml_plugins.h"

int main(int argc, char *argv[]) {
  set_qt_environment();

  QGuiApplication app(argc, argv);

  QQmlApplicationEngine engine;
  const QUrl url(u"qrc:Main/main.qml"_qs);
  QObject::connect(
      &engine, &QQmlApplicationEngine::objectCreated, &app,
      [url](QObject *obj, const QUrl &objUrl) {
        if (!obj && url == objUrl)
          QCoreApplication::exit(-1);
      },
      Qt::QueuedConnection);

  engine.addImportPath(QCoreApplication::applicationDirPath() + "/qml");
  engine.addImportPath(":/");

  qmlRegisterType<FileReader>("com.myapp", 1, 0, "FileReader");

  FileReader citiesReader;
  QString citiesFilePath = QStringLiteral(":/Main/resources/cities500.txt");
  QString citiesFileContent = citiesReader.readFile(citiesFilePath);
  QStringList citiesList = citiesFileContent.split("\n", Qt::SkipEmptyParts);

  FileReader countriesReader;
  QString countriesFilePath =
      QStringLiteral(":/Main/resources/country_codes.json");
  QString countriesFileContent = countriesReader.readFile(countriesFilePath);

  engine.rootContext()->setContextProperty("countriesList",
                                           countriesFileContent);

  engine.rootContext()->setContextProperty("citiesList", citiesList);

  engine.load(url);

  if (engine.rootObjects().isEmpty()) {
    return -1;
  }

  return app.exec();
}
