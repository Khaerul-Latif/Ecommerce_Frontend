import React from 'react'
import  styles from './index.module.css'
import GetReviewByUser from '@/components/review-produk/getByUser'

const ReviewProduk = () => {
 return(
  <div className={styles.container}>
    <GetReviewByUser/>
  </div>
 )
}

export default ReviewProduk