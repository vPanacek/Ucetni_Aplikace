package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

public interface PersonService {


    PersonDTO addPerson(PersonDTO personDTO);


    void removePerson(long id);

    List<PersonDTO> getAll();


    PersonDTO getPersonById(long id);

    PersonDTO updatePerson(long id, PersonDTO personDTO);

    List<PersonStatisticsDTO> getPersonStatistics();


}