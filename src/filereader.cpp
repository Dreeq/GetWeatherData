// FileReader.cpp
#include "FileReader.h"
#include "QtCore/qdebug.h"
#include <QFile>
#include <QTextStream>

FileReader::FileReader(QObject *parent) : QObject(parent) {}

QString FileReader::readFile(const QString &filePath) {
  QFile file(filePath);
  if (file.open(QIODevice::ReadOnly | QIODevice::Text)) {
    QTextStream in(&file);
    QString fileContent = in.readAll();
    file.close();
    return fileContent;
  } else {
    qWarning() << "Failed to open file:" << file.errorString();
    return "";
  }
}
