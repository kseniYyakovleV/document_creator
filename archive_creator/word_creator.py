from docxtpl import DocxTemplate
from io import BytesIO
from os import getcwd


class WordCreator:
    TEMPLATES_DIR = r"archive_creator/docx_templates/"
    TEMPLATE_NAME = None
    template_buffer = None
    VERBOSE_NAME = "Документ"
    FORMAT = ".docx"

    @classmethod
    def create_template_buffer(cls)-> BytesIO:
        buffer = BytesIO()
        try:
            with open(cls.TEMPLATES_DIR + cls.TEMPLATE_NAME, "rb") as template_file:
                buffer.write(template_file.read())
        except FileNotFoundError:
            print("Template is not found.")
        return buffer



    def __init__(self, *args, **kwargs):
        if not self.__class__.template_buffer:
            self.__class__.template_buffer = self.__class__.create_template_buffer()
        self._template = DocxTemplate(self.__class__.template_buffer)

    def render(self, context: dict):
        if not "name" in context:
            raise ValueError("Context must contain 'name' variable.")
        
        self.name = " ".join((self.__class__.VERBOSE_NAME, context["name"])) +  self.__class__.FORMAT
        self._template.render(context)

    def get_data(self)-> bytes:
        buffer_for_saved_data = BytesIO()
        self._template.save(buffer_for_saved_data)
        return buffer_for_saved_data.getvalue()





class FirstTemplateWordCreator(WordCreator):
    TEMPLATE_NAME = "template.docx"
    VERBOSE_NAME = "Заявление"
    def __init__(self, *args, **kwargs):
        super(FirstTemplateWordCreator, self).__init__(*args, *kwargs)

class SecondTemplateWordCreator(WordCreator):
    TEMPLATE_NAME = "second_template.docx"
    VERBOSE_NAME = "Обращение"
    def __init__(self, *args, **kwargs):
        super(SecondTemplateWordCreator, self).__init__(*args, *kwargs)

    



"""
template_name = "d:/template.docx"
template_path = abspath(template_name)
file = DocxTemplate(template_path)
file.render({"name": "ilya"})
file.save("fjakdfsj.docx")
"""
