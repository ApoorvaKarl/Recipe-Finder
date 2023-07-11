import React, { useState } from 'react';
import { Modal, Form, Button, Upload, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const RecipeModal = ({
  modalVisible,
  editMode,
  selectedRecipe,
  handleModalCancel,
  handleModalSubmit,
  handleImageUpload,
  form,
  imageFile,
}) => {
    
  return (
    <Modal
      open={modalVisible}
      title={editMode ? 'Edit Recipe' : 'Add Recipe'}
      onCancel={handleModalCancel}
      footer={[
        <Button key="cancel" onClick={handleModalCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          {editMode ? 'Save' : 'Add'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleModalSubmit} initialValues={selectedRecipe}>
        <Form.Item name="image" label="Image" rules={[{ required: true, message: 'Please select an image' }]}>
          <Upload.Dragger
            name="image"
            beforeUpload={handleImageUpload}
            accept="image/*"
            multiple={false}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag an image file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the recipe title' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="cookingTime"
          label="Cooking Time"
          rules={[{ required: true, message: 'Please enter the cooking time' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="instructions"
          label="Instructions"
          rules={[{ required: true, message: 'Please enter the recipe description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="ingredients"
          label="Ingredients"
          rules={[{ required: true, message: 'Please enter the recipe ingredients' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: 'Please enter the recipe rating' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cuisine"
          label="Cuisine"
          rules={[{ required: true, message: 'Please enter the recipe cuisine' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="dairy"
          label="Dairy"
          rules={[{ required: true, message: 'Please specify if the recipe contains dairy' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="calorie"
          label="Calorie"
          rules={[{ required: true, message: 'Please enter the recipe calorie' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecipeModal;
