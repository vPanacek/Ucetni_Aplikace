package cz.itnetwork.service;

import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.PersonEntity;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonServiceImpl implements PersonService {


    @Autowired
    private PersonMapper personMapper;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;

    public PersonDTO addPerson(PersonDTO personDTO) {
        PersonEntity entity = personMapper.toEntity(personDTO);
        entity = personRepository.save(entity);

        return personMapper.toDTO(entity);
    }

    public PersonDTO updatePerson(long id, PersonDTO personDTO) {
        PersonEntity updateEntityPerson = personRepository.getReferenceById(id);
        updateEntityPerson.setHidden(true);
        personRepository.save(updateEntityPerson);

        PersonEntity newEntity = personMapper.toEntity(personDTO);
        personRepository.save(newEntity);

        return personMapper.toDTO(newEntity);

    }

    @Override
    public void removePerson(long personId) {
        try {
            PersonEntity person = fetchPersonById(personId);
            person.setHidden(true);

            personRepository.save(person);
        } catch (NotFoundException ignored) {
            // The contract in the interface states, that no exception is thrown, if the entity is not found.
        }
    }

    // private region

    @Override
    public List<PersonDTO> getAll() {
        return personRepository.findByHidden(false)
                .stream()
                .map(i -> personMapper.toDTO(i))
                .collect(Collectors.toList());
    }

    @Override
    public PersonDTO getPersonById(long id) {
        PersonEntity personEntity = fetchPersonById(id);
        return personMapper.toDTO(personEntity);
    }

    @Override
    public List<PersonStatisticsDTO> getPersonStatistics() {
        return personRepository.findByHidden(false)
                .stream()
                .map(person -> {
                    Long revenue = invoiceRepository.findBySeller(person)
                            .stream()
                            .mapToLong(InvoiceEntity::getPrice)
                            .sum();
                    return new PersonStatisticsDTO(
                            person.getId(),
                            person.getName(),
                            revenue
                    );
                })
                .collect(Collectors.toList());
    }

    private PersonEntity fetchPersonById(long id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Person with id " + id + " wasn't found in the database."));
    }

}
