import {FormEvent, useRef, useState} from 'react';
import {Button, Col, Form, Row, Stack} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import {NoteData, Tag} from './App';
import {v4 as generateUuid} from 'uuid';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({onSubmit, onAddTag, availableTags}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  ref={titleRef}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  options={availableTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  isMulti
                  value={selectedTags.map((tag) => ({
                    label: tag.label,
                    value: tag.id,
                  }))}
                  onChange={(tags) =>
                    setSelectedTags(
                      tags.map((tag) => ({label: tag.label, id: tag.value}))
                    )
                  }
                  onCreateOption={(label) => {
                    const newTag = {label, id: generateUuid()};
                    onAddTag(newTag);
                    setSelectedTags((existingTags) => [
                      ...existingTags,
                      newTag,
                    ]);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={15}
              ref={markdownRef}
            />
          </Form.Group>
          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-end">
            <Button
              type="submit"
              variant="primary">
              Save
            </Button>
            <Link to="..">
              <Button
                type="button"
                variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
}
