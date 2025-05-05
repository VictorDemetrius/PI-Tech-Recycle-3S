package tech.recycle.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.recycle.api.model.Pontos;

public interface PontosRepository extends JpaRepository<Pontos, Long> {
}
