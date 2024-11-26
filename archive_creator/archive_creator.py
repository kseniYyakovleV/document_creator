from zipfile import ZipFile, ZIP_DEFLATED
from io import StringIO, BytesIO
from word_creator import FirstTemplateWordCreator, SecondTemplateWordCreator

class Archive:
    def __init__(self):
        self._archive_buffer = BytesIO()

    def open(self):
        self._archive = ZipFile(self._archive_buffer, "w", ZIP_DEFLATED)
    
    def __enter__(self):
        self.open()
        return self
    
    
    def add_file(self, file: FirstTemplateWordCreator | SecondTemplateWordCreator):
        self._archive.writestr(file.name, file.get_data())

    def get_data(self)-> bytes:
        return self._archive_buffer.getvalue()

    def close(self):
        self._archive.close()
    
    def __exit__(self, error_type, error_value, error_tb)-> bool:
        self.close()
        return False
    
    def save_as_file(self, file_name: str):
        with open(file_name, "wb") as file:
            file.write(self.get_data())

    def __del__(self):
        self._archive_buffer.close()

first_buffer = FirstTemplateWordCreator.create_template_buffer()

archive = Archive()
with archive:
    first = FirstTemplateWordCreator()
    first.render({"name": "ilya"})
    second = SecondTemplateWordCreator()
    second.render({"name": "maxim"})
    archive.add_file(first)
    archive.add_file(second)
    
archive.save_as_file("new_archive.zip")




