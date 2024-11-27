from django.db import models

# Create your models here.
class Person(models.Model):
    labels = {
        "full_name": "Полное имя собственника",
        "registration_date": "Дата регистрации/рождения",
        "borning_place": "Место рождения",
        "passport": "Паспорт: серия, номер, выдан",
        "registration_address": "Адрес регистрации/рождения",
        "registration_sign": "Регистрационный знак",
        "mark_and_model": "Марка, модель",
        "VIN": "VIN",
        "type": "Тип/категория ТС",
        "release_year": "Год выпуска",
        "engine": "Двигатель",
        "chassis": "Шасси (рама) №",
        "body": "Кузок/кабина/прицеп (номер)",
        "color": "Цвет",
        "might": "Мощность  двигателя",
        "ecological_class": "Экологический класс",
        "max_mass": "Разрешенная максимальная масса",
        "stressless_mass": "Масса без нагрузки",
        "PTS_number": "Номер ПТС",
        "PTS_extradition": "ПТС выдан"
    }
        
    full_name = models.TextField()
    registration_date = models.TextField()
    borning_place = models.TextField()
    passport = models.TextField()
    registration_address = models.TextField()
    registration_sign = models.TextField()
    mark_and_model = models.TextField()
    VIN = models.TextField()
    type = models.TextField()
    release_year = models.TextField()
    engine = models.TextField()
    chassis = models.TextField()
    body = models.TextField()
    color = models.TextField()
    might = models.TextField()
    ecological_class = models.TextField()
    max_mass = models.TextField()
    stressless_mass = models.TextField()
    PTS_number = models.TextField()
    PTS_extradition = models.TextField()
    is_downloaded = models.BooleanField(default = False)

    def get_short_name(self)->str:
        name = self.full_name.split(" ")
        short_name = [name[0]]
        if len(name) > 1:
            for part in name[1:]:
                if len(part) > 0:
                    short_name.append(part[0]+".")
        short_name = ' '.join(short_name)
        return short_name
    
    def get_short_info(self)->tuple:
        
        result = {
            "id": self.id,
            "full_name": self.full_name,
            "short_name": self.get_short_name(),
            "registration_sign": self.registration_sign,
            "is_downloaded": self.is_downloaded
        }
        return result
    
    @classmethod
    def get_short_objects(cls):
        
        data = (element.get_short_info() for element in cls.objects.all().order_by("-id"))
        return data
    

    def get_data_as_dict(self)->dict:
        result = dict()
        for label in Person.labels:
            result[label] = self.__getattribute__(label)
        result["short_name"] = self.get_short_name()
        return result