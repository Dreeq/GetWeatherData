// FileReader.h
#ifndef FILEREADER_H
#define FILEREADER_H

#include <QObject>

class FileReader : public QObject {
  Q_OBJECT

public:
  explicit FileReader(QObject *parent = nullptr);

public slots:
  QString readFile(const QString &filePath);
};

#endif // FILEREADER_H
