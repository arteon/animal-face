"""Tests for animal matching algorithm."""
import pytest
import animal_matcher


class TestMatchAnimal:
    """Tests for the match_animal function."""

    def test_returns_all_12_animals(self):
        # Use a dog-like profile
        features = dict(animal_matcher.ANIMALS["dog"]["profile"])
        result = animal_matcher.match_animal(features)
        assert len(result) == 12

    def test_percentages_sum_to_100(self):
        features = dict(animal_matcher.ANIMALS["cat"]["profile"])
        result = animal_matcher.match_animal(features)
        total = sum(m["percentage"] for m in result)
        assert abs(total - 100.0) < 0.5  # Allow small rounding

    def test_exact_profile_matches_highest(self):
        for animal_id in ["dog", "cat", "fox", "bear"]:
            features = dict(animal_matcher.ANIMALS[animal_id]["profile"])
            result = animal_matcher.match_animal(features)
            assert result[0]["id"] == animal_id, f"{animal_id} should match itself"

    def test_result_has_required_fields(self):
        features = dict(animal_matcher.ANIMALS["owl"]["profile"])
        result = animal_matcher.match_animal(features)
        for match in result:
            assert "id" in match
            assert "name" in match
            assert "emoji" in match
            assert "percentage" in match

    def test_sorted_by_percentage_descending(self):
        features = dict(animal_matcher.ANIMALS["wolf"]["profile"])
        result = animal_matcher.match_animal(features)
        percentages = [m["percentage"] for m in result]
        assert percentages == sorted(percentages, reverse=True)
