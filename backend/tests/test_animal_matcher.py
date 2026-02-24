"""Tests for animal matching algorithm — 3 simulations."""
import pytest
import animal_matcher


FEATURE_KEYS = list(animal_matcher.FEATURE_WEIGHTS.keys())
SAMPLE_FEATURES = dict(animal_matcher.ANIMALS["dog"]["profile"])


# ---------------------------------------------------------------------------
# Simulation 6: match_animal returns all 12 animals with required fields
# ---------------------------------------------------------------------------

class TestMatchAnimalResults:
    def test_returns_all_12_animals(self):
        result = animal_matcher.match_animal(SAMPLE_FEATURES)
        assert len(result) == 12

    def test_each_result_has_required_fields(self):
        result = animal_matcher.match_animal(SAMPLE_FEATURES)
        for match in result:
            assert "id" in match
            assert "name" in match
            assert "emoji" in match
            assert "percentage" in match

    def test_percentages_sum_to_100(self):
        result = animal_matcher.match_animal(SAMPLE_FEATURES)
        total = sum(m["percentage"] for m in result)
        assert abs(total - 100.0) < 0.5


# ---------------------------------------------------------------------------
# Simulation 7: percentages are sorted descending
# ---------------------------------------------------------------------------

class TestMatchAnimalSorting:
    def test_sorted_descending_by_percentage(self):
        result = animal_matcher.match_animal(SAMPLE_FEATURES)
        percentages = [m["percentage"] for m in result]
        assert percentages == sorted(percentages, reverse=True)

    def test_exact_profile_top_match_is_itself(self):
        for animal_id in ["dog", "cat", "fox", "bear"]:
            features = dict(animal_matcher.ANIMALS[animal_id]["profile"])
            result = animal_matcher.match_animal(features)
            assert result[0]["id"] == animal_id, (
                f"Expected '{animal_id}' to rank first when using its own profile"
            )


# ---------------------------------------------------------------------------
# Simulation 8: Feature profiles are structurally valid
# ---------------------------------------------------------------------------

class TestFeatureProfileValidity:
    def test_all_12_animals_have_all_10_feature_keys(self):
        assert len(animal_matcher.ANIMALS) == 12
        for animal_id, data in animal_matcher.ANIMALS.items():
            profile = data["profile"]
            for key in FEATURE_KEYS:
                assert key in profile, (
                    f"Animal '{animal_id}' is missing feature key '{key}'"
                )

    def test_all_feature_values_are_positive_floats(self):
        for animal_id, data in animal_matcher.ANIMALS.items():
            for key, value in data["profile"].items():
                assert isinstance(value, float), (
                    f"Animal '{animal_id}', key '{key}': expected float, got {type(value)}"
                )
                assert value > 0, (
                    f"Animal '{animal_id}', key '{key}': value {value} is not positive"
                )

    def test_all_feature_weights_exist_for_each_feature_key(self):
        for key in FEATURE_KEYS:
            assert key in animal_matcher.FEATURE_WEIGHTS, (
                f"Feature key '{key}' has no corresponding weight"
            )
            assert animal_matcher.FEATURE_WEIGHTS[key] > 0, (
                f"Weight for '{key}' must be positive"
            )
