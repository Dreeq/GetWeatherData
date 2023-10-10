#ifndef FILEREADER_H
#define FILEREADER_H

#include <QObject>

class FileReader : public QObject {
  Q_OBJECT

public:
  explicit FileReader(QObject *parent = nullptr);

public slots:

  /**
   * @brief readFile, Reads file into QString.
   * @param filePath, QString with path to file.
   * @return File content as QString.
   */
  QString readFile(const QString &filePath);

};

#endif // FILEREADER_H
